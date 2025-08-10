import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // Get the user
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { message, session_id, strategy_id } = await req.json()

    // Get or create chat session
    let sessionId = session_id
    if (!sessionId) {
      const { data: newSession } = await supabaseClient
        .from('chat_sessions')
        .insert({
          user_id: user.id,
          strategy_id: strategy_id || null,
          title: 'AI Consultation'
        })
        .select()
        .single()
      
      sessionId = newSession.id
    }

    // Get chat history for context
    const { data: chatHistory } = await supabaseClient
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(20)

    // Get strategy context if available
    let strategyContext = ''
    if (strategy_id) {
      const { data: strategy } = await supabaseClient
        .from('gtm_strategies')
        .select('*')
        .eq('id', strategy_id)
        .eq('user_id', user.id)
        .single()
      
      if (strategy) {
        strategyContext = `
        Current GTM Strategy Context:
        Business: ${strategy.title}
        Executive Summary: ${strategy.executive_summary}
        Primary Goals: ${JSON.stringify(strategy.recommendations)}
        `
      }
    }

    // Prepare messages for AI
    const messages = [
      {
        role: 'system',
        content: `You are an expert AI business consultant specializing in go-to-market strategies. 
        You provide strategic advice, explain rationale behind recommendations, and help businesses 
        optimize their market entry and growth strategies. Be concise, actionable, and data-driven.
        
        ${strategyContext}
        
        Guidelines:
        - Provide specific, actionable advice
        - Reference industry best practices
        - Suggest measurable metrics when relevant
        - Ask clarifying questions when needed
        - Be professional yet approachable`
      },
      ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message }
    ]

    // Generate AI response
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error('Failed to get AI response')
    }

    const aiData = await openaiResponse.json()
    const aiResponse = aiData.choices[0].message.content

    // Save user message
    await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        role: 'user',
        content: message
      })

    // Save AI response
    await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        role: 'assistant',
        content: aiResponse
      })

    // Update session timestamp
    await supabaseClient
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId)

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse,
        session_id: sessionId
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in AI consultant:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
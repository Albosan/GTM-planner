import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BusinessProfile {
  business_name: string;
  industry: string;
  business_model: string;
  primary_challenge: string;
  primary_goal: string;
  budget_range: string;
  target_market: string;
  additional_data?: any;
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

    // Check user credits
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('credits_remaining, subscription_tier')
      .eq('id', user.id)
      .single()

    if (!profile || profile.credits_remaining <= 0) {
      return new Response(
        JSON.stringify({ error: 'Insufficient credits' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { business_profile_id } = await req.json()

    // Get business profile
    const { data: businessProfile } = await supabaseClient
      .from('business_profiles')
      .select('*')
      .eq('id', business_profile_id)
      .eq('user_id', user.id)
      .single()

    if (!businessProfile) {
      return new Response(
        JSON.stringify({ error: 'Business profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate GTM strategy using AI
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const aiPrompt = `
    Generate a comprehensive Go-to-Market (GTM) strategy for the following business:

    Business Name: ${businessProfile.business_name}
    Industry: ${businessProfile.industry}
    Business Model: ${businessProfile.business_model}
    Primary Challenge: ${businessProfile.primary_challenge}
    Primary Goal: ${businessProfile.primary_goal}
    Budget Range: ${businessProfile.budget_range}
    Target Market: ${businessProfile.target_market}

    Please provide a detailed strategy including:
    1. Executive Summary
    2. Market Analysis
    3. Competitive Analysis
    4. Positioning Strategy
    5. Pricing Strategy
    6. Marketing Channels
    7. Sales Strategy
    8. Budget Allocation
    9. Timeline (90-day plan)
    10. Key Performance Indicators (KPIs)
    11. Recommendations

    Format the response as a structured JSON object with these sections.
    `;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert business consultant specializing in go-to-market strategies. Provide detailed, actionable, and data-driven recommendations.'
          },
          {
            role: 'user',
            content: aiPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error('Failed to generate strategy')
    }

    const aiData = await openaiResponse.json()
    const strategyContent = aiData.choices[0].message.content

    // Parse the AI response
    let parsedStrategy;
    try {
      parsedStrategy = JSON.parse(strategyContent)
    } catch {
      // If JSON parsing fails, create a structured response
      parsedStrategy = {
        executive_summary: strategyContent.substring(0, 500) + '...',
        market_analysis: { summary: 'Detailed market analysis provided in strategy content' },
        competitive_analysis: { summary: 'Competitive landscape analysis included' },
        positioning_strategy: { summary: 'Strategic positioning recommendations' },
        pricing_strategy: { summary: 'Pricing recommendations based on market research' },
        marketing_channels: { summary: 'Multi-channel marketing approach' },
        sales_strategy: { summary: 'Sales process and methodology' },
        budget_allocation: { summary: 'Budget distribution across channels' },
        timeline: { summary: '90-day implementation roadmap' },
        kpis: { summary: 'Key metrics to track success' },
        recommendations: { summary: 'Strategic recommendations for growth' }
      }
    }

    // Save GTM strategy to database
    const { data: strategy, error: strategyError } = await supabaseClient
      .from('gtm_strategies')
      .insert({
        user_id: user.id,
        business_profile_id: business_profile_id,
        title: `GTM Strategy for ${businessProfile.business_name}`,
        status: 'completed',
        executive_summary: parsedStrategy.executive_summary || '',
        market_analysis: parsedStrategy.market_analysis || {},
        competitive_analysis: parsedStrategy.competitive_analysis || {},
        positioning_strategy: parsedStrategy.positioning_strategy || {},
        pricing_strategy: parsedStrategy.pricing_strategy || {},
        marketing_channels: parsedStrategy.marketing_channels || {},
        sales_strategy: parsedStrategy.sales_strategy || {},
        budget_allocation: parsedStrategy.budget_allocation || {},
        timeline: parsedStrategy.timeline || {},
        kpis: parsedStrategy.kpis || {},
        recommendations: parsedStrategy.recommendations || {}
      })
      .select()
      .single()

    if (strategyError) {
      throw strategyError
    }

    // Deduct credits and log usage
    await supabaseClient
      .from('user_profiles')
      .update({ 
        credits_remaining: profile.credits_remaining - 1 
      })
      .eq('id', user.id)

    await supabaseClient
      .from('usage_logs')
      .insert({
        user_id: user.id,
        action: 'generate_gtm_strategy',
        resource_type: 'gtm_strategy',
        resource_id: strategy.id,
        credits_used: 1
      })

    return new Response(
      JSON.stringify({ 
        success: true, 
        strategy: strategy,
        credits_remaining: profile.credits_remaining - 1
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error generating GTM strategy:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
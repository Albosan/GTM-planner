import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vqjskfueyqnqxzzgpflq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxanNrZnVleXFucXh6emdwZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjExNjYsImV4cCI6MjA0OTU5NzE2Nn0.HJq8p5kL-8wHYVTsYbQ0ykBOr23A4ZPG4g6yowDkgng'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          job_title: string | null
          subscription_tier: 'starter' | 'professional' | 'enterprise'
          subscription_ends_at: string | null
          credits_remaining: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          job_title?: string | null
          subscription_tier?: 'starter' | 'professional' | 'enterprise'
          subscription_ends_at?: string | null
          credits_remaining?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          job_title?: string | null
          subscription_tier?: 'starter' | 'professional' | 'enterprise'
          subscription_ends_at?: string | null
          credits_remaining?: number
          created_at?: string
          updated_at?: string
        }
      }
      business_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          industry: string
          business_model: string
          primary_challenge: string
          primary_goal: string
          budget_range: string
          target_market: string
          additional_data: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          industry: string
          business_model: string
          primary_challenge: string
          primary_goal: string
          budget_range: string
          target_market: string
          additional_data?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          industry?: string
          business_model?: string
          primary_challenge?: string
          primary_goal?: string
          budget_range?: string
          target_market?: string
          additional_data?: any
          created_at?: string
          updated_at?: string
        }
      }
      gtm_strategies: {
        Row: {
          id: string
          user_id: string
          business_profile_id: string
          title: string
          status: 'draft' | 'completed' | 'archived'
          executive_summary: string | null
          market_analysis: any
          competitive_analysis: any
          positioning_strategy: any
          pricing_strategy: any
          marketing_channels: any
          sales_strategy: any
          budget_allocation: any
          timeline: any
          kpis: any
          recommendations: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_profile_id: string
          title: string
          status?: 'draft' | 'completed' | 'archived'
          executive_summary?: string | null
          market_analysis?: any
          competitive_analysis?: any
          positioning_strategy?: any
          pricing_strategy?: any
          marketing_channels?: any
          sales_strategy?: any
          budget_allocation?: any
          timeline?: any
          kpis?: any
          recommendations?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_profile_id?: string
          title?: string
          status?: 'draft' | 'completed' | 'archived'
          executive_summary?: string | null
          market_analysis?: any
          competitive_analysis?: any
          positioning_strategy?: any
          pricing_strategy?: any
          marketing_channels?: any
          sales_strategy?: any
          budget_allocation?: any
          timeline?: any
          kpis?: any
          recommendations?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
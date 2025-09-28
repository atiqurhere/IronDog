export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          name: string | null
          avatar_url: string | null
          bio: string | null
          country: string | null
          telegram: string | null
          wallet_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          telegram?: string | null
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          telegram?: string | null
          wallet_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          id: string
          user_id: string
          mining_balance: number
          referrals: number
          earnings: number
          total_points: number
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mining_balance?: number
          referrals?: number
          earnings?: number
          total_points?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mining_balance?: number
          referrals?: number
          earnings?: number
          total_points?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stats_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string
          referred_id: string
          referral_code: string
          reward_claimed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          referrer_id: string
          referred_id: string
          referral_code: string
          reward_claimed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          referrer_id?: string
          referred_id?: string
          referral_code?: string
          reward_claimed?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
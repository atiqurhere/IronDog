import { supabase } from './supabase'
import { Database } from './database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type Stats = Database['public']['Tables']['stats']['Row']

export const authHelpers = {
  async signUp(email: string, password: string, userData: { name: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
        },
      },
    })
    
    if (error) throw error
    
    // Create profile
    if (data.user) {
      await supabase
        .from('profiles')
        .insert([
          {
            user_id: data.user.id,
            email: data.user.email!,
            name: userData.name,
          },
        ])
      
      // Initialize stats
      await supabase
        .from('stats')
        .insert([
          {
            user_id: data.user.id,
            mining_balance: 0,
            referrals: 0,
            earnings: 0,
            total_points: 0,
            level: 1,
          },
        ])
    }
    
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    
    if (error) throw error
    return data
  },

  async updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password,
    })
    
    if (error) throw error
    return data
  },

  async getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user || null
  },

  async getUserProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) return null
    return data
  },

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserStats(userId: string): Promise<Stats | null> {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) return null
    return data
  },

  async updateStats(userId: string, updates: Partial<Stats>) {
    const { data, error } = await supabase
      .from('stats')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },
}
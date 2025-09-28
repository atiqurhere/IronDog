import { v4 as uuidv4 } from 'uuid'
import { supabase } from './supabase'

export const referralHelpers = {
  generateReferralCode(userId: string): string {
    return `REF_${userId.slice(0, 8)}_${uuidv4().slice(0, 8)}`.toUpperCase()
  },

  async createReferralLink(userId: string): Promise<string> {
    const code = this.generateReferralCode(userId)
    const baseUrl = window.location.origin
    return `${baseUrl}/signup?ref=${code}`
  },

  async processReferral(referralCode: string, newUserId: string) {
    try {
      // Find the referrer by checking existing referral codes
      const { data: existingReferral } = await supabase
        .from('referrals')
        .select('referrer_id')
        .eq('referral_code', referralCode)
        .single()

      if (existingReferral) {
        // Create referral record
        await supabase
          .from('referrals')
          .insert([
            {
              referrer_id: existingReferral.referrer_id,
              referred_id: newUserId,
              referral_code: referralCode,
            },
          ])

        // Update referrer stats
        const { data: referrerStats } = await supabase
          .from('stats')
          .select('*')
          .eq('user_id', existingReferral.referrer_id)
          .single()

        if (referrerStats) {
          await supabase
            .from('stats')
            .update({
              referrals: referrerStats.referrals + 1,
              earnings: referrerStats.earnings + 10, // $10 referral bonus
              total_points: referrerStats.total_points + 100, // 100 points bonus
            })
            .eq('user_id', existingReferral.referrer_id)
        }

        // Give bonus to new user
        const { data: newUserStats } = await supabase
          .from('stats')
          .select('*')
          .eq('user_id', newUserId)
          .single()

        if (newUserStats) {
          await supabase
            .from('stats')
            .update({
              total_points: newUserStats.total_points + 50, // 50 points welcome bonus
            })
            .eq('user_id', newUserId)
        }

        // Create notification for referrer
        await supabase
          .from('notifications')
          .insert([
            {
              user_id: existingReferral.referrer_id,
              title: 'New Referral!',
              message: 'Someone joined using your referral link. You earned $10 and 100 points!',
              type: 'success',
            },
          ])

        return true
      }
      return false
    } catch (error) {
      console.error('Error processing referral:', error)
      return false
    }
  },

  async getReferralStats(userId: string) {
    const { data: referrals } = await supabase
      .from('referrals')
      .select(`
        *,
        referred:profiles!referrals_referred_id_fkey(name, email, created_at)
      `)
      .eq('referrer_id', userId)

    const totalReferrals = referrals?.length || 0
    const totalEarnings = totalReferrals * 10 // $10 per referral

    return {
      totalReferrals,
      totalEarnings,
      referrals: referrals || [],
    }
  },
}
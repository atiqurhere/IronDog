'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { authHelpers } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Zap,
  ArrowUpRight,
  Eye,
  Download,
  Gift
} from 'lucide-react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface UserStats {
  miningBalance: number
  totalEarnings: number
  referrals: number
  totalPoints: number
  level: number
}

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<UserStats>({
    miningBalance: 0,
    totalEarnings: 0,
    referrals: 0,
    totalPoints: 0,
    level: 1
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      setUser(session.user)
      await loadUserStats(session.user.id)
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  const loadUserStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setStats({
          miningBalance: data.mining_balance || 0,
          totalEarnings: data.earnings || 0,
          referrals: data.referrals || 0,
          totalPoints: data.total_points || 0,
          level: data.level || 1
        })
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const startMining = async () => {
    // Mining logic here
    console.log('Mining started...')
  }

  const claimRewards = async () => {
    // Claim rewards logic here
    console.log('Rewards claimed...')
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  // Chart data
  const earningsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Earnings',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const miningDistribution = {
    labels: ['Bitcoin', 'Ethereum', 'Litecoin', 'Dogecoin'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#F7931A', '#627EEA', '#345D9D', '#C2A633'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.user_metadata?.name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your mining overview for today
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={startMining} className="bg-green-600 hover:bg-green-700">
              <Zap className="w-4 h-4 mr-2" />
              Start Mining
            </Button>
            <Button onClick={claimRewards} variant="outline">
              <Gift className="w-4 h-4 mr-2" />
              Claim Rewards
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mining Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.miningBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +8.3%
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.referrals}</div>
              <p className="text-xs text-muted-foreground">
                +2 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level & Points</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level {stats.level}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalPoints} XP earned
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mining Earnings</CardTitle>
              <CardDescription>Your monthly mining performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line 
                  data={earningsData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mining Distribution</CardTitle>
              <CardDescription>Breakdown of mined cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <Doughnut 
                  data={miningDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest mining and transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Mining', crypto: 'BTC', amount: '+0.00123', value: '+$45.67', time: '2 hours ago' },
                { type: 'Referral Bonus', crypto: 'ETH', amount: '+0.05', value: '+$87.32', time: '1 day ago' },
                { type: 'Mining', crypto: 'LTC', amount: '+0.5', value: '+$23.45', time: '2 days ago' },
                { type: 'Withdrawal', crypto: 'BTC', amount: '-0.001', value: '-$37.21', time: '3 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.type}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{activity.amount} {activity.crypto}</p>
                    <p className="text-xs text-gray-500">{activity.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
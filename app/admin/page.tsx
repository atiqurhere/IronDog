'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings,
  UserPlus,
  AlertCircle,
  Activity,
  Database,
  Shield,
  Eye,
  Edit,
  Trash2,
  Search
} from 'lucide-react'
import { Bar, Line } from 'react-chartjs-2'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalEarnings: number
  totalMiners: number
  systemHealth: number
  newSignups: number
}

interface User {
  id: string
  email: string
  name: string | null
  created_at: string
  last_sign_in_at: string | null
  role: 'user' | 'admin'
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [adminStats, setAdminStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalEarnings: 0,
    totalMiners: 0,
    systemHealth: 95,
    newSignups: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth')
        return
      }

      // Check if user is admin (you'll need to implement role checking)
      const isAdmin = await checkUserRole(session.user.id)
      if (!isAdmin) {
        router.push('/user')
        return
      }

      setUser(session.user)
      await loadAdminData()
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/auth')
    } finally {
      setLoading(false)
    }
  }

  const checkUserRole = async (userId: string): Promise<boolean> => {
    try {
      // This is a placeholder - implement actual role checking
      // You might check against a roles table or user metadata
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      // For demo purposes, check if email contains 'admin'
      return profile?.email?.includes('admin') || false
    } catch (error) {
      return false
    }
  }

  const loadAdminData = async () => {
    try {
      // Load user count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })

      // Load recent users
      const { data: recentUsers } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      // Load total earnings from all users
      const { data: earnings } = await supabase
        .from('stats')
        .select('earnings')

      const totalEarnings = earnings?.reduce((sum, stat) => sum + (stat.earnings || 0), 0) || 0

      setAdminStats({
        totalUsers: totalUsers || 0,
        activeUsers: Math.floor((totalUsers || 0) * 0.7), // Mock active users
        totalEarnings,
        totalMiners: Math.floor((totalUsers || 0) * 0.8), // Mock miners
        systemHealth: 95,
        newSignups: Math.floor((totalUsers || 0) * 0.1) // Mock new signups
      })

      setUsers(recentUsers?.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name,
        created_at: u.created_at,
        last_sign_in_at: null, // You'd get this from auth.users if needed
        role: u.email?.includes('admin') ? 'admin' : 'user'
      })) || [])

    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  // Chart data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: [12, 19, 30, 50, 20, 30],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
    ],
  }

  const systemMetrics = {
    labels: ['CPU', 'Memory', 'Storage', 'Network'],
    datasets: [
      {
        label: 'Usage %',
        data: [45, 67, 23, 78],
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              System overview and management console
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setActiveTab('settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {['overview', 'users', 'system', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{adminStats.newSignups} new this month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((adminStats.activeUsers / adminStats.totalUsers) * 100)}% of total
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${adminStats.totalEarnings.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Platform total
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.systemHealth}%</div>
                  <p className="text-xs text-green-600">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly new user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar 
                      data={userGrowthData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>Current system resource usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar 
                      data={systemMetrics}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                          },
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage all registered users</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Last Active</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{user.name || 'No name'}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Database Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Connection Status</span>
                    <span className="text-green-600 font-medium">Connected</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Connections</span>
                    <span>23/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Storage Used</span>
                    <span>2.3GB / 100GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-800">High Memory Usage</div>
                    <div className="text-sm text-yellow-600">Memory usage is at 78%</div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="font-medium text-green-800">Backup Completed</div>
                    <div className="text-sm text-green-600">Daily backup completed successfully</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Site Name</label>
                      <Input placeholder="CryptoDash" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Admin Email</label>
                      <Input placeholder="admin@cryptodash.com" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Mining Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Mining Rate</label>
                      <Input type="number" placeholder="0.001" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Referral Bonus %</label>
                      <Input type="number" placeholder="10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
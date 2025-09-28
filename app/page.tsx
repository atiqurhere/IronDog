import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Shield, Zap, Users, BarChart3, DollarSign, Gift } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  CryptoDash
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
              <Link href="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            The Ultimate Crypto
            <span className="text-blue-600 dark:text-blue-400 block">
              Mining Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Track your mining performance, manage referrals, analyze earnings, and grow your crypto portfolio with our comprehensive dashboard solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Mining
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to manage your crypto mining operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>
                  Multi-factor authentication with Google OAuth and wallet connect support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Real-time charts and insights into your mining performance and earnings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Gift className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Referral System</CardTitle>
                <CardDescription>
                  Earn rewards by inviting friends with our built-in referral tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Earnings Tracking</CardTitle>
                <CardDescription>
                  Monitor your daily, weekly, and monthly mining earnings with detailed breakdowns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Comprehensive admin panel for managing users and mining operations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-red-600 mb-4" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Live notifications and real-time data synchronization across all devices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10,000+
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                Active Miners
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                $2.5M+
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                Total Earnings
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                99.9%
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                Uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Mining?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of miners already earning with our platform. Get started in minutes.
          </p>
          <Link href="/auth">
            <Button size="lg" variant="secondary">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CryptoDash</h3>
              <p className="text-gray-400">
                The ultimate crypto mining dashboard for professionals.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-300">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/status">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CryptoDash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Users, Target, Award, Shield, Globe, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  IronDog
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About IronDog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing cryptocurrency mining by making it accessible, 
            profitable, and secure for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At IronDog, we believe that cryptocurrency mining should be accessible to everyone, 
              not just tech experts with expensive hardware. Our mission is to democratize crypto 
              mining by providing a user-friendly platform that anyone can use to start earning 
              cryptocurrency rewards.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We combine cutting-edge technology with intuitive design to create the world's 
              most trusted and efficient mining platform. Whether you're a beginner or an 
              experienced miner, IronDog provides the tools and support you need to succeed 
              in the crypto space.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$2.5M+</div>
                  <div className="text-gray-400">Total Payouts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-gray-400">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-500" />,
                title: "Security First",
                description: "We prioritize the security of your funds and data with bank-grade encryption and industry-best practices."
              },
              {
                icon: <Users className="h-12 w-12 text-green-500" />,
                title: "Community Driven",
                description: "Our platform is built for and with our community. We listen to feedback and continuously improve."
              },
              {
                icon: <Target className="h-12 w-12 text-purple-500" />,
                title: "Innovation",
                description: "We're constantly pushing the boundaries of what's possible in cryptocurrency mining technology."
              }
            ].map((value, index) => (
              <Card key={index} className="bg-white/5 border-white/10 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle className="text-white">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                role: "CEO & Founder",
                avatar: "AT",
                description: "Former blockchain engineer at major crypto exchanges with 8+ years experience."
              },
              {
                name: "Sarah Kim",
                role: "CTO",
                avatar: "SK", 
                description: "Leading cryptocurrency mining researcher and distributed systems expert."
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Security",
                avatar: "MR",
                description: "Cybersecurity veteran with expertise in financial systems and crypto protocols."
              }
            ].map((member, index) => (
              <Card key={index} className="bg-white/5 border-white/10 text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <p className="text-blue-400">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Mining Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful miners who trust IronDog for their cryptocurrency mining needs.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Zap className="w-5 h-5 mr-2" />
              Start Mining Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
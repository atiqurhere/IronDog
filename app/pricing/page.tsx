import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, Zap, Star, Shield, Headphones } from 'lucide-react'

export default function PricingPage() {
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your mining goals. All plans include our core features 
            and 24/7 customer support.
          </p>
          
          {/* Monthly/Yearly Toggle */}
          <div className="inline-flex items-center bg-white/10 rounded-lg p-1 backdrop-blur-sm">
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-white/20 text-white">
              Monthly
            </button>
            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white">
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {[
            {
              name: "Starter",
              price: "Free",
              period: "Forever",
              description: "Perfect for beginners exploring crypto mining",
              features: [
                "Basic mining access",
                "Up to $10/month earnings",
                "Email support",
                "Basic analytics dashboard",
                "Standard mining speed"
              ],
              popular: false,
              cta: "Get Started Free",
              badge: null
            },
            {
              name: "Pro",
              price: "$29",
              period: "per month",
              description: "Best for serious miners looking to scale",
              features: [
                "Advanced mining algorithms",
                "Up to $500/month earnings",
                "Priority 24/7 support",
                "Advanced analytics & reports",
                "Referral bonus program",
                "Mobile notifications",
                "Faster mining speeds",
                "Multiple cryptocurrency options"
              ],
              popular: true,
              cta: "Start Pro Mining",
              badge: "Most Popular"
            },
            {
              name: "Enterprise",
              price: "$99",
              period: "per month",
              description: "For large-scale mining operations",
              features: [
                "Enterprise mining power",
                "Unlimited earnings potential",
                "Dedicated account manager",
                "Custom analytics & API access",
                "White-label solutions",
                "Advanced security features",
                "Custom mining pools",
                "Priority transaction processing"
              ],
              popular: false,
              cta: "Contact Sales",
              badge: "Enterprise"
            }
          ].map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 scale-105 bg-white/10' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    {plan.badge}
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-white text-2xl mb-2">{plan.name}</CardTitle>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-white/10 hover:bg-white/20 border-white/30 text-white'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Compare Features
          </h2>
          
          <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="text-left p-4 text-white font-medium">Features</th>
                    <th className="text-center p-4 text-white font-medium">Starter</th>
                    <th className="text-center p-4 text-white font-medium">Pro</th>
                    <th className="text-center p-4 text-white font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    { feature: "Mining Access", starter: "✓", pro: "✓", enterprise: "✓" },
                    { feature: "Monthly Earnings Limit", starter: "$10", pro: "$500", enterprise: "Unlimited" },
                    { feature: "Cryptocurrencies", starter: "Bitcoin only", pro: "5+ coins", enterprise: "All coins" },
                    { feature: "Analytics Dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
                    { feature: "Support", starter: "Email", pro: "24/7 Priority", enterprise: "Dedicated Manager" },
                    { feature: "API Access", starter: "✗", pro: "Limited", enterprise: "Full" },
                    { feature: "White-label", starter: "✗", pro: "✗", enterprise: "✓" }
                  ].map((row, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">{row.starter}</td>
                      <td className="p-4 text-center">{row.pro}</td>
                      <td className="p-4 text-center">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Are there any hidden fees?",
                answer: "No hidden fees. What you see is what you pay. All transaction fees are clearly displayed."
              },
              {
                question: "How do payouts work?",
                answer: "Daily automatic payouts to your wallet. No minimum threshold for Pro and Enterprise plans."
              },
              {
                question: "Is there a free trial?",
                answer: "The Starter plan is free forever. You can also try Pro free for 7 days with no commitment."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Mining?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of miners earning daily rewards. Start with our free plan or 
            try Pro for 7 days risk-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Mining
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Headphones className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
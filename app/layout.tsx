import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supabase Dashboard - Crypto Mining & Analytics Platform',
  description: 'A complete dashboard solution with authentication, analytics, referral system, and user management powered by Supabase.',
  keywords: 'crypto, mining, dashboard, analytics, referrals, supabase, nextjs',
  authors: [{ name: 'Dashboard Team' }],
  openGraph: {
    title: 'Supabase Dashboard',
    description: 'Complete crypto mining and analytics platform',
    url: 'https://yourapp.vercel.app',
    siteName: 'Supabase Dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supabase Dashboard',
    description: 'Complete crypto mining and analytics platform',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
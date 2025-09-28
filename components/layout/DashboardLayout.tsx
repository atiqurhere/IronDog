'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface DashboardLayoutProps {
  children: any
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
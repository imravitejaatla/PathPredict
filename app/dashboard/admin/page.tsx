"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Bus, Map, Users, BarChart2, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FleetManagement } from "@/components/admin/fleet-management"
import { RoutePlanning } from "@/components/admin/route-planning"
import { UserManagement } from "@/components/admin/user-management"
import { ReportsAnalytics } from "@/components/admin/reports-analytics"
import { SystemSettings } from "@/components/admin/system-settings"
import { Notifications } from "@/components/admin/notifications"
import { useTheme } from "@/components/theme-provider"
import { TransportationAnalyticsCharts } from "@/components/charts/transportation-analytics-charts"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { setTheme, theme } = useTheme()
  const [chartsError, setChartsError] = useState(false)

  useEffect(() => {
    // Reset error state on mount
    setChartsError(false)
  }, [])

  useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Function to render the active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case "fleet":
        return <FleetManagement onBack={() => setActiveSection(null)} />
      case "routes":
        return <RoutePlanning onBack={() => setActiveSection(null)} />
      case "users":
        return <UserManagement onBack={() => setActiveSection(null)} />
      case "reports":
        return <ReportsAnalytics onBack={() => setActiveSection(null)} />
      case "settings":
        return <SystemSettings onBack={() => setActiveSection(null)} />
      case "notifications":
        return <Notifications onBack={() => setActiveSection(null)} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === "dark" ? "dark bg-gray-900" : ""}`}>
      <DashboardHeader />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Admin Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {activeSection ? (
          renderActiveSection()
        ) : (
          <>
            {/* Enhanced Welcome Panel */}
            <Card className="bg-white rounded-lg shadow-md p-6 mb-6 dark:bg-gray-900 dark:border dark:border-gray-800">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-semibold">Transportation Analytics</CardTitle>
                <CardDescription>Key metrics and trends for the school transportation system.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {chartsError ? (
                  <div className="p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">
                      There was an error loading the charts. Please try refreshing the page.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                      Refresh Page
                    </Button>
                  </div>
                ) : (
                  <div onError={() => setChartsError(true)}>
                    <TransportationAnalyticsCharts />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                icon={Bus}
                title="Fleet Management"
                description="Manage buses, maintenance schedules, and driver assignments."
                onClick={() => setActiveSection("fleet")}
              />
              <DashboardCard
                icon={Map}
                title="Route Planning"
                description="Create and optimize transportation routes for maximum efficiency."
                onClick={() => setActiveSection("routes")}
              />
              <DashboardCard
                icon={Users}
                title="User Management"
                description="Manage accounts for drivers, parents, and students."
                onClick={() => setActiveSection("users")}
              />
              <DashboardCard
                icon={BarChart2}
                title="Reports & Analytics"
                description="View detailed reports on transportation performance and metrics."
                onClick={() => setActiveSection("reports")}
              />
              <DashboardCard
                icon={Settings}
                title="System Settings"
                description="Configure system-wide settings and preferences."
                onClick={() => setActiveSection("settings")}
              />
              <DashboardCard
                icon={Bell}
                title="Notifications"
                description="Manage and send system-wide alerts and notifications."
                onClick={() => setActiveSection("notifications")}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

interface DashboardCardProps {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
}

function DashboardCard({ icon: Icon, title, description, onClick }: DashboardCardProps) {
  return (
    <Card className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">{description}</p>
      <Button
        variant="ghost"
        className="text-blue-600 p-0 h-auto flex items-center dark:text-blue-400"
        onClick={onClick}
      >
        Manage <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
      </Button>
    </Card>
  )
}

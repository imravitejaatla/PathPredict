"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronRight, Info, Bus, Bell, Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { MyBusView } from "@/components/student/my-bus"
import { CheckInStatusView } from "@/components/student/check-in-status"
import { ScheduleView } from "@/components/student/schedule"
import { NotificationsView } from "@/components/student/notifications"
import { TripHistoryView } from "@/components/student/trip-history"
import { HelpSupportView } from "@/components/student/help-support"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Replace the StudentDashboard component with this enhanced version
export default function StudentDashboard() {
  const { theme } = useTheme()
  const [activeView, setActiveView] = useState<string | null>(null)
  const [greeting, setGreeting] = useState("Hello")
  const [currentTime, setCurrentTime] = useState("")

  // Get time-based greeting
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")

      // Format current time
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    }

    updateGreeting()
    const interval = setInterval(updateGreeting, 60000)
    return () => clearInterval(interval)
  }, [])

  // Function to render the active view content
  const renderActiveView = () => {
    switch (activeView) {
      case "my-bus":
        return <MyBusView onBack={() => setActiveView(null)} />
      case "check-in-status":
        return <CheckInStatusView onBack={() => setActiveView(null)} />
      case "schedule":
        return <ScheduleView onBack={() => setActiveView(null)} />
      case "notifications":
        return <NotificationsView onBack={() => setActiveView(null)} />
      case "trip-history":
        return <TripHistoryView onBack={() => setActiveView(null)} />
      case "help-support":
        return <HelpSupportView onBack={() => setActiveView(null)} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === "dark" ? "dark bg-gray-900" : ""}`}>
      <DashboardHeader />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Student Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeView ? (
          renderActiveView()
        ) : (
          <>
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <Image
                  src="/playful-park-afternoon.png"
                  alt="Background decoration"
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">{currentTime}</span>
                    <Badge variant="outline" className="bg-green-500/20 text-white border-green-400">
                      Online
                    </Badge>
                  </div>

                  <h2 className="text-3xl font-bold">{greeting}, Alex!</h2>
                  <p className="text-white/80 max-w-md">
                    Ready for school? Your bus is on schedule today. Track your journey and manage your transportation
                    right here.
                  </p>

                  <div className="flex gap-3 mt-2">
                    <Button
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      onClick={() => setActiveView("my-bus")}
                    >
                      Track My Bus
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                      onClick={() => setActiveView("schedule")}
                    >
                      View Schedule
                    </Button>
                  </div>
                </div>

                <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 rounded-full p-3">
                      <Bus className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-white/70">Next Bus</div>
                      <div className="font-semibold">Bus #103 • 7:30 AM</div>
                      <div className="text-sm text-white/70">Arrives in 25 min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <QuickInfoCard
                icon={<Bus className="h-5 w-5 text-blue-500" />}
                title="Bus Status"
                value="On Time"
                description="Bus #103 is running on schedule"
                color="bg-blue-50 dark:bg-blue-950"
              />
              <QuickInfoCard
                icon={<MapPin className="h-5 w-5 text-green-500" />}
                title="Next Stop"
                value="Dagenham Heathway"
                description="Scheduled for 7:30 AM"
                color="bg-green-50 dark:bg-green-950"
              />
              <QuickInfoCard
                icon={<Clock className="h-5 w-5 text-amber-500" />}
                title="Travel Time"
                value="25 minutes"
                description="To UEL Docklands Campus"
                color="bg-amber-50 dark:bg-amber-950"
              />
              <QuickInfoCard
                icon={<CheckCircle2 className="h-5 w-5 text-purple-500" />}
                title="Check-in Status"
                value="Ready"
                description="Tap your ID when boarding"
                color="bg-purple-50 dark:bg-purple-950"
              />
            </div>

            <Alert className="mb-8 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertTitle className="text-blue-700 dark:text-blue-300">Interactive Demo Mode</AlertTitle>
              <AlertDescription className="text-blue-600 dark:text-blue-400">
                Try searching for routes between "RM109QB" (Dagenham) and "E162RD" (UEL Docklands) in the "My Bus"
                section for a full interactive experience!
              </AlertDescription>
            </Alert>

            <h3 className="text-xl font-semibold mb-4 dark:text-white">Quick Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="My Bus"
                description="Track your assigned bus and estimated arrival times."
                onClick={() => setActiveView("my-bus")}
                icon={<Bus className="h-5 w-5" />}
              />
              <DashboardCard
                title="Check-in Status"
                description="View your daily transportation check-in/check-out status."
                onClick={() => setActiveView("check-in-status")}
                icon={<CheckCircle2 className="h-5 w-5" />}
              />
              <DashboardCard
                title="Schedule"
                description="View your transportation schedule and pickup/dropoff times."
                onClick={() => setActiveView("schedule")}
                icon={<Calendar className="h-5 w-5" />}
              />
              <DashboardCard
                title="Notifications"
                description="View important transportation alerts and updates."
                onClick={() => setActiveView("notifications")}
                icon={<Bell className="h-5 w-5" />}
              />
              <DashboardCard
                title="Trip History"
                description="View your past transportation records."
                onClick={() => setActiveView("trip-history")}
                icon={<Clock className="h-5 w-5" />}
              />
              <DashboardCard
                title="Help & Support"
                description="Access transportation help resources and contact support."
                onClick={() => setActiveView("help-support")}
                icon={<Info className="h-5 w-5" />}
              />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

interface QuickInfoCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
  color: string
}

function QuickInfoCard({ icon, title, value, description, color }: QuickInfoCardProps) {
  return (
    <Card className={`border-0 ${color}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">{icon}</div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
            <div className="font-semibold text-lg">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  onClick: () => void
  icon: React.ReactNode
}

function DashboardCard({ title, description, onClick, icon }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">{icon}</div>
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">{description}</p>
      <Button
        variant="ghost"
        className="text-blue-600 p-0 h-auto flex items-center dark:text-blue-400"
        onClick={onClick}
      >
        View <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

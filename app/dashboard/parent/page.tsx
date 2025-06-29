"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Bell, Calendar, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { ChildrenStatusView } from "@/components/parent/children-status"
import { BusTrackingView } from "@/components/parent/bus-tracking"
import { NotificationsView } from "@/components/parent/notifications"
import { ScheduleChangesView } from "@/components/parent/schedule-changes"
import { CommunicationView } from "@/components/parent/communication"
import { TripHistoryView } from "@/components/parent/trip-history"
import { DashboardHeader } from "@/components/dashboard-header"
import { ChildProfiles } from "@/components/parent/child-profiles"
import { WeatherWidget } from "@/components/parent/weather-widget"
import { BusMapPreview } from "@/components/parent/bus-map-preview"
import { NotificationPreferences } from "@/components/parent/notification-preferences"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getWeather } from "@/services/weather-service"

export default function ParentDashboard() {
  const { theme } = useTheme()
  const [activeView, setActiveView] = useState<string | null>(null)
  const [showNotificationPrefs, setShowNotificationPrefs] = useState(false)

  const [greeting, setGreeting] = useState("Welcome")
  const [userName, setUserName] = useState("Parent")
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [nextBusArrival, setNextBusArrival] = useState("3:15 PM")
  const [weatherCondition, setWeatherCondition] = useState("Loading...")
  const [weatherIcon, setWeatherIcon] = useState("cloud")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }

    // In a real app, you would fetch the user's name from your auth system
    setUserName("Alex")

    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const data = await getWeather()
        setWeatherCondition(data.condition)
        setWeatherIcon(data.icon)
      } catch (error) {
        console.error("Failed to fetch weather:", error)
        setWeatherCondition("Unavailable")
      }
    }

    fetchWeather()
  }, [])

  // Function to render the active view content
  const renderActiveView = () => {
    switch (activeView) {
      case "children-status":
        return <ChildrenStatusView onBack={() => setActiveView(null)} />
      case "bus-tracking":
        return <BusTrackingView onBack={() => setActiveView(null)} />
      case "notifications":
        return <NotificationsView onBack={() => setActiveView(null)} />
      case "schedule-changes":
        return <ScheduleChangesView onBack={() => setActiveView(null)} />
      case "communication":
        return <CommunicationView onBack={() => setActiveView(null)} />
      case "trip-history":
        return <TripHistoryView onBack={() => setActiveView(null)} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === "dark" ? "dark bg-gray-900" : ""}`}>
      <DashboardHeader />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Parent Dashboard</h1>
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-6 dark:from-gray-800 dark:to-gray-900 dark:border dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">
                    {greeting}, {userName}!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Track your children's transportation, receive updates, and stay connected with drivers.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm self-start mt-4 md:mt-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Today's Weather:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">{weatherCondition}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mr-3">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Notifications</p>
                    <p className="font-medium text-gray-800 dark:text-white">{unreadNotifications} unread</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2 mr-3">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Next Bus</p>
                    <p className="font-medium text-gray-800 dark:text-white">{nextBusArrival}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-2 mr-3">
                    <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Schedule</p>
                    <p className="font-medium text-gray-800 dark:text-white">Regular</p>
                  </div>
                </div>

                <div
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowNotificationPrefs(true)}
                >
                  <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-2 mr-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Settings</p>
                    <p className="font-medium text-gray-800 dark:text-white">Notification Preferences</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Child Profiles Section */}
            <div className="mb-8">
              <ChildProfiles />
            </div>

            {/* Weather and Bus Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <WeatherWidget />
              <BusMapPreview />
            </div>

            <h3 className="text-lg font-semibold mb-4">Dashboard Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Children's Status"
                description="Track your children's location and transportation status."
                onClick={() => setActiveView("children-status")}
              />
              <DashboardCard
                title="Bus Tracking"
                description="View real-time location of your children's school buses."
                onClick={() => setActiveView("bus-tracking")}
              />
              <DashboardCard
                title="Notifications"
                description="Manage your notification preferences and history."
                onClick={() => setActiveView("notifications")}
              />
              <DashboardCard
                title="Schedule Changes"
                description="Request and view transportation schedule changes."
                onClick={() => setActiveView("schedule-changes")}
              />
              <DashboardCard
                title="Communication"
                description="Message drivers and transportation administrators."
                onClick={() => setActiveView("communication")}
              />
              <DashboardCard
                title="Trip History"
                description="View past transportation records and patterns."
                onClick={() => setActiveView("trip-history")}
              />
            </div>
          </>
        )}
      </main>

      {/* Notification Preferences Dialog */}
      <Dialog open={showNotificationPrefs} onOpenChange={setShowNotificationPrefs}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
          </DialogHeader>
          <NotificationPreferences />
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  onClick: () => void
}

function DashboardCard({ title, description, onClick }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">{title}</h3>
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

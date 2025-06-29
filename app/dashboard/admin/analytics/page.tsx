"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { AnalyticsPanel } from "@/components/admin/analytics-panel"

export default function AdminAnalyticsDashboard() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === "dark" ? "dark" : ""}`}>
      <header className="bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Admin Analytics</h1>
            <Link href="/dashboard/admin">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnalyticsPanel />
      </main>
    </div>
  )
}

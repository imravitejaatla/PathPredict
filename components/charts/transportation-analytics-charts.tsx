"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DailyRidershipChart } from "./daily-ridership-chart"
import { RouteUtilizationChart } from "./route-utilization-chart"
import { OnTimePerformanceChart } from "./on-time-performance-chart"
import { TransportationModeChart } from "./transportation-mode-chart"

export function TransportationAnalyticsCharts() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Reset error state on mount
    setHasError(false)
  }, [])

  if (hasError) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30 text-center">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Chart Error</h3>
        <p className="text-red-600 dark:text-red-400">
          There was an error loading the charts. Please try refreshing the page.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Wrap each chart in error boundaries */}
      <ErrorBoundary onError={() => setHasError(true)}>
        <DailyRidershipChart />
      </ErrorBoundary>

      <ErrorBoundary onError={() => setHasError(true)}>
        <RouteUtilizationChart />
      </ErrorBoundary>

      <ErrorBoundary onError={() => setHasError(true)}>
        <OnTimePerformanceChart />
      </ErrorBoundary>

      <ErrorBoundary onError={() => setHasError(true)}>
        <TransportationModeChart />
      </ErrorBoundary>
    </div>
  )
}

// Simple error boundary component
function ErrorBoundary({ children, onError }: { children: React.ReactNode; onError: () => void }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("Chart error:", error)
    onError()
    return null
  }
}

"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ScheduleViewProps {
  onBack: () => void
}

export function ScheduleView({ onBack }: ScheduleViewProps) {
  const [activeDay, setActiveDay] = useState("monday")

  // Sample schedule data
  const weeklySchedule = {
    monday: [
      {
        id: 1,
        route: "Morning Route #103",
        pickupTime: "07:30 AM",
        pickupLocation: "Dagenham Heathway (RM10 9QB)",
        dropoffTime: "07:55 AM",
        dropoffLocation: "UEL Docklands Campus (E16 2RD)",
      },
      {
        id: 2,
        route: "Afternoon Route #103",
        pickupTime: "04:15 PM",
        pickupLocation: "UEL Docklands Campus (E16 2RD)",
        dropoffTime: "04:40 PM",
        dropoffLocation: "Dagenham Heathway (RM10 9QB)",
      },
    ],
    tuesday: [
      {
        id: 3,
        route: "Morning Route #103",
        pickupTime: "07:30 AM",
        pickupLocation: "Dagenham Heathway (RM10 9QB)",
        dropoffTime: "07:55 AM",
        dropoffLocation: "UEL Docklands Campus (E16 2RD)",
      },
      {
        id: 4,
        route: "Afternoon Route #103",
        pickupTime: "04:15 PM",
        pickupLocation: "UEL Docklands Campus (E16 2RD)",
        dropoffTime: "04:40 PM",
        dropoffLocation: "Dagenham Heathway (RM10 9QB)",
      },
    ],
    wednesday: [
      {
        id: 5,
        route: "Morning Route #103",
        pickupTime: "07:30 AM",
        pickupLocation: "Dagenham Heathway (RM10 9QB)",
        dropoffTime: "07:55 AM",
        dropoffLocation: "UEL Docklands Campus (E16 2RD)",
      },
      {
        id: 6,
        route: "Afternoon Route #103",
        pickupTime: "04:15 PM",
        pickupLocation: "UEL Docklands Campus (E16 2RD)",
        dropoffTime: "04:40 PM",
        dropoffLocation: "Dagenham Heathway (RM10 9QB)",
      },
    ],
    thursday: [
      {
        id: 7,
        route: "Morning Route #103",
        pickupTime: "07:30 AM",
        pickupLocation: "Dagenham Heathway (RM10 9QB)",
        dropoffTime: "07:55 AM",
        dropoffLocation: "UEL Docklands Campus (E16 2RD)",
      },
      {
        id: 8,
        route: "Afternoon Route #103",
        pickupTime: "04:15 PM",
        pickupLocation: "UEL Docklands Campus (E16 2RD)",
        dropoffTime: "04:40 PM",
        dropoffLocation: "Dagenham Heathway (RM10 9QB)",
      },
    ],
    friday: [
      {
        id: 9,
        route: "Morning Route #103",
        pickupTime: "07:30 AM",
        pickupLocation: "Dagenham Heathway (RM10 9QB)",
        dropoffTime: "07:55 AM",
        dropoffLocation: "UEL Docklands Campus (E16 2RD)",
      },
      {
        id: 10,
        route: "Afternoon Route #103",
        pickupTime: "03:15 PM", // Early dismissal on Friday
        pickupLocation: "UEL Docklands Campus (E16 2RD)",
        dropoffTime: "03:40 PM",
        dropoffLocation: "Dagenham Heathway (RM10 9QB)",
      },
    ],
    saturday: [],
    sunday: [],
  }

  // Schedule changes
  const scheduleChanges = [
    {
      id: 1,
      date: "2025-04-25",
      description: "Early dismissal day - afternoon pickup will be 1 hour earlier",
      affectedRoutes: ["Afternoon Route #103"],
    },
    {
      id: 2,
      date: "2025-05-01",
      description: "No school - Bank Holiday",
      affectedRoutes: ["Morning Route #103", "Afternoon Route #103"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Schedule</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transportation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              Try house and school locations like "RM109QB" and "E162RD" for best results.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="changes">Schedule Changes</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly" className="mt-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <Button
                    key={day}
                    variant={activeDay === day ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => setActiveDay(day)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Button>
                ))}
              </div>

              {weeklySchedule[activeDay].length > 0 ? (
                <div className="space-y-4">
                  {weeklySchedule[activeDay].map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <h3 className="font-medium mb-3">{schedule.route}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <MapPin className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">Pickup</p>
                            <p className="text-sm">{schedule.pickupTime}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            <MapPin className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">Dropoff</p>
                            <p className="text-sm">{schedule.dropoffTime}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No transportation scheduled for this day</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="changes" className="mt-4 space-y-4">
              {scheduleChanges.map((change) => (
                <div
                  key={change.id}
                  className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-medium text-amber-800 dark:text-amber-300">
                          Schedule Change: {change.date}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50"
                        >
                          Upcoming
                        </Badge>
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">{change.description}</p>
                      <div className="mt-3 text-xs text-amber-600 dark:text-amber-300">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Affected Routes: {change.affectedRoutes.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">Regular Schedule</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      Your regular transportation schedule is as follows:
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-blue-700 dark:text-blue-200">
                      <p>
                        <strong>Monday-Thursday:</strong> Morning pickup at 07:30 AM, Afternoon return at 04:15 PM
                      </p>
                      <p>
                        <strong>Friday:</strong> Morning pickup at 07:30 AM, Afternoon return at 03:15 PM (Early
                        dismissal)
                      </p>
                      <p>
                        <strong>Weekends:</strong> No transportation service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

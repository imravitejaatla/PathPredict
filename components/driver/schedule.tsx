"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScheduleViewProps {
  onBack: () => void
}

export function ScheduleView({ onBack }: ScheduleViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("week")

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Get week dates
  const getWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }

    return dates
  }

  // Navigate to previous period
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(currentDate.getDate() - 1)
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() - 7)
    } else {
      newDate.setMonth(currentDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  // Navigate to next period
  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "day") {
      newDate.setDate(currentDate.getDate() + 1)
    } else if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + 7)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Sample schedule data
  const scheduleData = [
    {
      id: 1,
      route: "Morning Route #103",
      description: "Dagenham to UEL Docklands Campus",
      date: new Date(),
      startTime: "07:30",
      endTime: "08:00",
      status: "scheduled",
    },
    {
      id: 2,
      route: "Afternoon Route #103",
      description: "UEL Docklands Campus to Dagenham",
      date: new Date(),
      startTime: "16:15",
      endTime: "16:45",
      status: "scheduled",
    },
    {
      id: 3,
      route: "Morning Route #103",
      description: "Dagenham to UEL Docklands Campus",
      date: new Date(currentDate.getTime() + 86400000), // Tomorrow
      startTime: "07:30",
      endTime: "08:00",
      status: "scheduled",
    },
    {
      id: 4,
      route: "Afternoon Route #103",
      description: "UEL Docklands Campus to Dagenham",
      date: new Date(currentDate.getTime() + 86400000), // Tomorrow
      startTime: "16:15",
      endTime: "16:45",
      status: "scheduled",
    },
    {
      id: 5,
      route: "Special Event",
      description: "Field Trip Transportation",
      date: new Date(currentDate.getTime() + 172800000), // Day after tomorrow
      startTime: "09:00",
      endTime: "15:00",
      status: "pending",
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Driving Assignments
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-4">
              {viewMode === "day" ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-center">{formatDate(currentDate)}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    {scheduleData.filter((item) => item.date.toDateString() === currentDate.toDateString()).length >
                    0 ? (
                      <div className="space-y-3">
                        {scheduleData
                          .filter((item) => item.date.toDateString() === currentDate.toDateString())
                          .map((item) => (
                            <ScheduleItem key={item.id} item={item} />
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No assignments scheduled for this day
                      </div>
                    )}
                  </div>
                </div>
              ) : viewMode === "week" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {getWeekDates().map((date, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {date.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div
                          className={`text-sm font-medium rounde  })}
                        </div>
                        <div 
                          className={\`text-sm font-medium rounded-full h-7 w-7 flex items-center justify-center mx-auto ${
                            date.toDateString() === new Date().toDateString() ? "bg-blue-500 text-white" : ""
                          }`}
                        >
                          {date.getDate()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 h-[400px]">
                    {getWeekDates().map((date, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 h-full overflow-y-auto">
                        {scheduleData.filter((item) => item.date.toDateString() === date.toDateString()).length > 0 ? (
                          <div className="space-y-2">
                            {scheduleData
                              .filter((item) => item.date.toDateString() === date.toDateString())
                              .map((item) => (
                                <ScheduleItem key={item.id} item={item} compact />
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-xs text-gray-500 dark:text-gray-400">
                            No assignments
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Month view would be displayed here
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Route</th>
                      <th className="p-3 text-left font-medium">Time</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((item) => (
                      <tr key={item.id} className="border-b dark:border-gray-700">
                        <td className="p-3">
                          {item.date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{item.route}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                        </td>
                        <td className="p-3">
                          {item.startTime} - {item.endTime}
                        </td>
                        <td className="p-3">
                          <Badge variant={item.status === "scheduled" ? "default" : "outline"}>
                            {item.status === "scheduled" ? "Scheduled" : "Pending"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

interface ScheduleItemProps {
  item: {
    id: number
    route: string
    description: string
    date: Date
    startTime: string
    endTime: string
    status: string
  }
  compact?: boolean
}

function ScheduleItem({ item, compact = false }: ScheduleItemProps) {
  if (compact) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded p-2 border border-gray-200 dark:border-gray-700 text-xs">
        <div className="font-medium truncate">{item.route}</div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-gray-500" />
            <span>{item.startTime}</span>
          </div>
          <Badge variant={item.status === "scheduled" ? "default" : "outline"} className="text-[10px] h-4 px-1">
            {item.status === "scheduled" ? "Scheduled" : "Pending"}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{item.route}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
        </div>
        <Badge variant={item.status === "scheduled" ? "default" : "outline"}>
          {item.status === "scheduled" ? "Scheduled" : "Pending"}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          <span>
            {item.startTime} - {item.endTime}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
          <span>Route #103</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-gray-500" />
          <span>42 students</span>
        </div>
      </div>
    </div>
  )
}

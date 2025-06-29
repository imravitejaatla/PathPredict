"use client"

import { useState } from "react"
import { ArrowLeft, Search, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CheckInStatusViewProps {
  onBack: () => void
}

export function CheckInStatusView({ onBack }: CheckInStatusViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState("today")
  const [selectedRoute, setSelectedRoute] = useState("all")

  // Sample check-in data
  const checkInData = [
    {
      id: 1,
      date: "2025-04-19",
      route: "Morning Route #103",
      checkInTime: "07:30 AM",
      checkInLocation: "Dagenham Heathway",
      checkOutTime: "07:55 AM",
      checkOutLocation: "UEL Docklands Campus",
      status: "completed",
    },
    {
      id: 2,
      date: "2025-04-19",
      route: "Afternoon Route #103",
      checkInTime: "04:15 PM",
      checkInLocation: "UEL Docklands Campus",
      checkOutTime: "04:40 PM",
      checkOutLocation: "Dagenham Heathway",
      status: "completed",
    },
    {
      id: 3,
      date: "2025-04-18",
      route: "Morning Route #103",
      checkInTime: "07:30 AM",
      checkInLocation: "Dagenham Heathway",
      checkOutTime: "08:00 AM",
      checkOutLocation: "UEL Docklands Campus",
      status: "completed",
    },
    {
      id: 4,
      date: "2025-04-18",
      route: "Afternoon Route #103",
      checkInTime: "04:15 PM",
      checkInLocation: "UEL Docklands Campus",
      checkOutTime: "04:40 PM",
      checkOutLocation: "Dagenham Heathway",
      status: "completed",
    },
  ]

  // Filter check-in data based on search, date, and route
  const filteredData = checkInData.filter((item) => {
    const matchesSearch =
      item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkInLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.checkOutLocation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDate =
      selectedDate === "all" ||
      (selectedDate === "today" && item.date === "2025-04-19") ||
      (selectedDate === "yesterday" && item.date === "2025-04-18")

    const matchesRoute = selectedRoute === "all" || item.route === selectedRoute

    return matchesSearch && matchesDate && matchesRoute
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Check-in Status</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transportation Check-in Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  <SelectItem value="Morning Route #103">Morning Route #103</SelectItem>
                  <SelectItem value="Afternoon Route #103">Afternoon Route #103</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="today">Today's Status</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Route</th>
                      <th className="p-3 text-left font-medium">Check-in</th>
                      <th className="p-3 text-left font-medium">Check-out</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id} className="border-b dark:border-gray-700">
                        <td className="p-3">{item.date}</td>
                        <td className="p-3">{item.route}</td>
                        <td className="p-3">
                          <div>{item.checkInTime}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.checkInLocation}</div>
                        </td>
                        <td className="p-3">
                          <div>{item.checkOutTime}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{item.checkOutLocation}</div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-green-500">Completed</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No check-in records found matching your filters</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="today" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    Morning Route #103
                    <Badge className="bg-green-500">Completed</Badge>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">07:30 AM at Dagenham Heathway</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">07:55 AM at UEL Docklands Campus</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    Afternoon Route #103
                    <Badge className="bg-green-500">Completed</Badge>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">04:15 PM at UEL Docklands Campus</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">04:40 PM at Dagenham Heathway</p>
                      </div>
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

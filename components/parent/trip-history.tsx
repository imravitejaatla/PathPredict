"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Download, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"

interface TripHistoryViewProps {
  onBack: () => void
}

export function TripHistoryView({ onBack }: TripHistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // 7 days ago
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  // Sample trip history data
  const tripHistory = [
    {
      id: 1,
      child: "Alex Thompson",
      route: "Morning Route #103",
      date: "2025-04-19",
      boardingTime: "07:30 AM",
      boardingLocation: "Dagenham Heathway",
      arrivalTime: "07:55 AM",
      arrivalLocation: "UEL Docklands Campus",
      status: "completed",
    },
    {
      id: 2,
      child: "Emma Thompson",
      route: "Morning Route #103",
      date: "2025-04-19",
      boardingTime: "07:30 AM",
      boardingLocation: "Dagenham Heathway",
      arrivalTime: "07:55 AM",
      arrivalLocation: "UEL Docklands Campus",
      status: "completed",
    },
    {
      id: 3,
      child: "Alex Thompson",
      route: "Afternoon Route #103",
      date: "2025-04-19",
      boardingTime: "04:15 PM",
      boardingLocation: "UEL Docklands Campus",
      arrivalTime: "04:40 PM",
      arrivalLocation: "Dagenham Heathway",
      status: "completed",
    },
    {
      id: 4,
      child: "Emma Thompson",
      route: "Afternoon Route #103",
      date: "2025-04-19",
      boardingTime: "04:15 PM",
      boardingLocation: "UEL Docklands Campus",
      arrivalTime: "04:40 PM",
      arrivalLocation: "Dagenham Heathway",
      status: "completed",
    },
    {
      id: 5,
      child: "Michael Thompson",
      route: "Morning Route #215",
      date: "2025-04-19",
      boardingTime: "07:45 AM",
      boardingLocation: "North Station",
      arrivalTime: "08:05 AM",
      arrivalLocation: "Main Campus",
      status: "completed",
    },
    {
      id: 6,
      child: "Michael Thompson",
      route: "Afternoon Route #215",
      date: "2025-04-19",
      boardingTime: "04:30 PM",
      boardingLocation: "Main Campus",
      arrivalTime: "04:50 PM",
      arrivalLocation: "North Station",
      status: "completed",
    },
    {
      id: 7,
      child: "Alex Thompson",
      route: "Morning Route #103",
      date: "2025-04-18",
      boardingTime: "07:30 AM",
      boardingLocation: "Dagenham Heathway",
      arrivalTime: "08:00 AM",
      arrivalLocation: "UEL Docklands Campus",
      status: "delayed",
      delay: "5 minutes",
      reason: "Traffic congestion",
    },
  ]

  // Filter trip history based on search, child, route, and date range
  const filteredTrips = tripHistory.filter((trip) => {
    const matchesSearch =
      trip.child.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.boardingLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.arrivalLocation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesChild = selectedChild === "all" || trip.child === selectedChild
    const matchesRoute = selectedRoute === "all" || trip.route === selectedRoute

    // Check if trip date is within the selected date range
    const tripDate = new Date(trip.date)
    const isAfterStartDate = startDate ? tripDate >= startDate : true
    const isBeforeEndDate = endDate ? tripDate <= endDate : true

    return matchesSearch && matchesChild && matchesRoute && isAfterStartDate && isBeforeEndDate
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Trip History</h2>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transportation Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search trips..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger>
                  <SelectValue placeholder="Select child" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  <SelectItem value="Alex Thompson">Alex Thompson</SelectItem>
                  <SelectItem value="Emma Thompson">Emma Thompson</SelectItem>
                  <SelectItem value="Michael Thompson">Michael Thompson</SelectItem>
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
                  <SelectItem value="Morning Route #215">Morning Route #215</SelectItem>
                  <SelectItem value="Afternoon Route #215">Afternoon Route #215</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-sm">
                  <DatePicker date={startDate} setDate={setStartDate} />
                  <span>to</span>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Child</th>
                  <th className="p-3 text-left font-medium">Route</th>
                  <th className="p-3 text-left font-medium">Boarding</th>
                  <th className="p-3 text-left font-medium">Arrival</th>
                  <th className="p-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrips.map((trip) => (
                  <tr key={trip.id} className="border-b dark:border-gray-700">
                    <td className="p-3">{trip.date}</td>
                    <td className="p-3">{trip.child}</td>
                    <td className="p-3">{trip.route}</td>
                    <td className="p-3">
                      <div>{trip.boardingTime}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{trip.boardingLocation}</div>
                    </td>
                    <td className="p-3">
                      <div>{trip.arrivalTime}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{trip.arrivalLocation}</div>
                    </td>
                    <td className="p-3">
                      <Badge
                        className={
                          trip.status === "completed"
                            ? "bg-green-500"
                            : trip.status === "delayed"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }
                      >
                        {trip.status === "completed"
                          ? "Completed"
                          : trip.status === "delayed"
                            ? `Delayed (${trip.delay})`
                            : "Cancelled"}
                      </Badge>
                      {trip.reason && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{trip.reason}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p>No trip records found matching your filters</p>
            </div>
          )}
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

"use client"

import { useState } from "react"
import { ArrowLeft, Search, MapPin, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChildrenStatusViewProps {
  onBack: () => void
}

export function ChildrenStatusView({ onBack }: ChildrenStatusViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for children
  const children = [
    {
      id: 1,
      name: "Alex Thompson",
      grade: "10",
      route: "Morning Route #103",
      status: "on-bus",
      lastUpdate: "08:15 AM",
      location: "Near Becontree Heath",
      estimatedArrival: "08:30 AM",
      photo: "/playful-park-afternoon.png",
    },
    {
      id: 2,
      name: "Emma Thompson",
      grade: "8",
      route: "Morning Route #103",
      status: "on-bus",
      lastUpdate: "08:15 AM",
      location: "Near Becontree Heath",
      estimatedArrival: "08:30 AM",
      photo: "/playful-park-afternoon.png",
    },
    {
      id: 3,
      name: "Michael Thompson",
      grade: "6",
      route: "Afternoon Route #215",
      status: "at-school",
      lastUpdate: "08:00 AM",
      location: "UEL Docklands Campus",
      estimatedPickup: "04:15 PM",
      photo: "/playful-park-afternoon.png",
    },
  ]

  // Filter children based on search
  const filteredChildren = children.filter((child) => child.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "on-bus":
        return <Badge className="bg-blue-500">On Bus</Badge>
      case "at-school":
        return <Badge className="bg-green-500">At School</Badge>
      case "at-home":
        return <Badge className="bg-purple-500">At Home</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Children's Status</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Track Your Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search children..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="current">Current Status</TabsTrigger>
              <TabsTrigger value="history">Today's History</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-4 space-y-4">
              {filteredChildren.map((child) => (
                <div
                  key={child.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-lg">{child.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Grade {child.grade} • {child.route}
                          </p>
                        </div>
                        <div>{renderStatusBadge(child.status)}</div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Last Update</p>
                            <p className="text-sm">{child.lastUpdate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                            <p className="text-sm">{child.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {child.status === "on-bus" ? (
                            <>
                              <Clock className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Arrival</p>
                                <p className="text-sm">{child.estimatedArrival}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-gray-500" />
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Pickup</p>
                                <p className="text-sm">{child.estimatedPickup || "N/A"}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Child</th>
                      <th className="p-3 text-left font-medium">Time</th>
                      <th className="p-3 text-left font-medium">Event</th>
                      <th className="p-3 text-left font-medium">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">Alex Thompson</td>
                      <td className="p-3">07:30 AM</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Boarded Bus</span>
                        </div>
                      </td>
                      <td className="p-3">Dagenham Heathway</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">Emma Thompson</td>
                      <td className="p-3">07:30 AM</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Boarded Bus</span>
                        </div>
                      </td>
                      <td className="p-3">Dagenham Heathway</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">Michael Thompson</td>
                      <td className="p-3">07:45 AM</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Arrived at School</span>
                        </div>
                      </td>
                      <td className="p-3">UEL Docklands Campus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="mt-4">
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-amber-800 dark:text-amber-300">Bus #103 Delay</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
                        Bus #103 is currently experiencing a 5-minute delay due to traffic.
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-300 mt-2">Today, 07:45 AM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Schedule Change Notice</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Tomorrow's afternoon pickup will be 15 minutes earlier due to early dismissal.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Yesterday, 03:30 PM</p>
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

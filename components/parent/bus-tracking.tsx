"use client"

import { useState } from "react"
import { ArrowLeft, Bus, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

interface BusTrackingViewProps {
  onBack: () => void
}

export function BusTrackingView({ onBack }: BusTrackingViewProps) {
  const [selectedRoute, setSelectedRoute] = useState("morning-103")

  // Sample bus data
  const buses = [
    {
      id: "bus-103",
      number: "Bus #103",
      route: "Morning Route #103",
      routeId: "morning-103",
      driver: "John Smith",
      status: "in-transit",
      location: "Near Becontree Heath",
      nextStop: "A13 Junction",
      estimatedArrival: "08:30 AM",
      progress: 35,
      delay: 0,
    },
    {
      id: "bus-215",
      number: "Bus #215",
      route: "Morning Route #215",
      routeId: "morning-215",
      driver: "Sarah Johnson",
      status: "in-transit",
      location: "North Station",
      nextStop: "Main Campus",
      estimatedArrival: "08:15 AM",
      progress: 75,
      delay: 5,
    },
    {
      id: "bus-el1",
      number: "Bus #EL1",
      route: "EL1 Transit Route",
      routeId: "el1-transit",
      driver: "Michael Brown",
      status: "in-transit",
      location: "Barking Station",
      nextStop: "East Ham",
      estimatedArrival: "08:45 AM",
      progress: 50,
      delay: 0,
    },
  ]

  // Get the selected bus
  const selectedBus = buses.find((bus) => bus.routeId === selectedRoute) || buses[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Bus Tracking</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-lg">Live Bus Location</CardTitle>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger className="w-full sm:w-[250px]">
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning-103">Morning Route #103</SelectItem>
                <SelectItem value="morning-215">Morning Route #215</SelectItem>
                <SelectItem value="el1-transit">EL1 Transit Route</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="details">Route Details</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Bus className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Interactive map would be displayed here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Showing live location of {selectedBus.number}
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      {selectedBus.number}
                      <Badge className={selectedBus.delay > 0 ? "bg-amber-500" : "bg-green-500"}>
                        {selectedBus.delay > 0 ? `${selectedBus.delay} min delay` : "On Time"}
                      </Badge>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Driver: {selectedBus.driver}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Arrival</p>
                    <p className="font-medium">{selectedBus.estimatedArrival}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Route Progress</span>
                    <span>{selectedBus.progress}%</span>
                  </div>
                  <Progress value={selectedBus.progress} className="h-2" />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                      <p className="text-sm">{selectedBus.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Next Stop</p>
                      <p className="text-sm">{selectedBus.nextStop}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Stop</th>
                      <th className="p-3 text-left font-medium">Scheduled Time</th>
                      <th className="p-3 text-left font-medium">Estimated Time</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">Dagenham Heathway</td>
                      <td className="p-3">07:30 AM</td>
                      <td className="p-3">07:30 AM</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50"
                        >
                          Completed
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">Becontree Heath</td>
                      <td className="p-3">07:38 AM</td>
                      <td className="p-3">07:40 AM</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-900/50"
                        >
                          Completed
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                      <td className="p-3 font-medium">A13 Junction</td>
                      <td className="p-3">07:45 AM</td>
                      <td className="p-3">07:48 AM</td>
                      <td className="p-3">
                        <Badge className="bg-blue-500">Next Stop</Badge>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">UEL Docklands Campus</td>
                      <td className="p-3">07:55 AM</td>
                      <td className="p-3">07:58 AM</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                        >
                          Pending
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">Route Information</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                      This route operates every school day. The bus is equipped with GPS tracking and student
                      check-in/check-out system.
                    </p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-blue-700 dark:text-blue-200 font-medium">Driver</p>
                        <p className="text-blue-600 dark:text-blue-300">John Smith</p>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-200 font-medium">Bus Number</p>
                        <p className="text-blue-600 dark:text-blue-300">Bus #103</p>
                      </div>
                      <div>
                        <p className="text-blue-700 dark:text-blue-200 font-medium">License Plate</p>
                        <p className="text-blue-600 dark:text-blue-300">SB-12345</p>
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

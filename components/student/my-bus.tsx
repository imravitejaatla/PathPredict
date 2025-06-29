"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Bus, MapPin, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MyBusViewProps {
  onBack: () => void
}

export function MyBusView({ onBack }: MyBusViewProps) {
  const [fromLocation, setFromLocation] = useState("RM109QB")
  const [toLocation, setToLocation] = useState("E162RD")
  const [isSearching, setIsSearching] = useState(false)

  // Simulate search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setTimeout(() => {
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">My Bus</h2>
        </div>
        <Badge className="bg-green-500">On Time</Badge>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bus className="h-5 w-5 text-blue-500" />
            Bus #103: Morning Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              Try house and school locations like "RM109QB" and "E162RD" for best results.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Enter your location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
            <Button type="submit" className="md:col-span-2" disabled={isSearching}>
              {isSearching ? "Searching..." : "Find My Bus"}
            </Button>
          </form>

          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="stops">Stops</TabsTrigger>
              <TabsTrigger value="info">Bus Info</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Bus className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Interactive map would be displayed here</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Showing live location of Bus #103</p>
                </div>
              </div>

              <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Morning Route #103</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dagenham to UEL Docklands Campus</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Arrival</p>
                    <p className="font-medium">07:55 AM</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Route Progress</span>
                    <span>35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current Location</p>
                      <p className="text-sm">Near Becontree Heath</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Next Stop</p>
                      <p className="text-sm">A13 Junction (07:45 AM)</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stops" className="mt-4">
              <div className="space-y-4">
                <div className="relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm dark:bg-gray-800">
                    <h4 className="font-medium">Dagenham Heathway</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Heathway, Dagenham RM10 9QB</p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Scheduled: 7:30 AM</span>
                      <span>Actual: 7:32 AM</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm dark:bg-gray-800">
                    <h4 className="font-medium">Becontree Heath</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Becontree Heath, Dagenham</p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Scheduled: 7:38 AM</span>
                      <span>Actual: 7:40 AM</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-300 border-dashed">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm dark:bg-gray-800">
                    <h4 className="font-medium">A13 Junction</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">A13, Newham Way</p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Scheduled: 7:45 AM</span>
                      <span>ETA: 7:48 AM</span>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 border-l-2 border-gray-300 border-dashed">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm dark:bg-gray-800">
                    <h4 className="font-medium">UEL Docklands Campus</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">University Way, London E16 2RD</p>
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Scheduled: 7:55 AM</span>
                      <span>ETA: 7:58 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="mt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Bus Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Bus Number:</span>
                        <span className="font-medium">Bus #103</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Type:</span>
                        <span className="font-medium">School Bus</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Capacity:</span>
                        <span className="font-medium">42 seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">License Plate:</span>
                        <span className="font-medium">SB-12345</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Driver Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Driver Name:</span>
                        <span className="font-medium">John Smith</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">License:</span>
                        <span className="font-medium">PSV-12345</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                        <span className="font-medium">8 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Contact:</span>
                        <span className="font-medium">Via Dispatch Only</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-3">Route Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Route Name:</span>
                      <span className="font-medium">Morning Route #103</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">From:</span>
                      <span className="font-medium">Dagenham Heathway (RM10 9QB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">To:</span>
                      <span className="font-medium">UEL Docklands Campus (E16 2RD)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Distance:</span>
                      <span className="font-medium">11.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                      <span className="font-medium">25 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Schedule:</span>
                      <span className="font-medium">Weekdays, 7:30 AM</span>
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

"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Navigation, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface TodaysRouteViewProps {
  onBack: () => void
}

export function TodaysRouteView({ onBack }: TodaysRouteViewProps) {
  const [activeTab, setActiveTab] = useState("map")
  const [routeProgress, setRouteProgress] = useState(35)

  // Simulate route progress changing
  const simulateProgress = () => {
    setRouteProgress((prev) => Math.min(prev + 10, 100))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Today's Route</h2>
        </div>
        <Badge variant={routeProgress < 100 ? "default" : "success"} className="px-3 py-1">
          {routeProgress < 100 ? "In Progress" : "Completed"}
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            Morning Route #103: Dagenham to UEL Docklands Campus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Departure: 7:30 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Estimated Arrival: 7:55 AM</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Route Progress:</span>
              <div className="w-48">
                <Progress value={routeProgress} className="h-2" />
              </div>
              <span className="text-sm">{routeProgress}%</span>
            </div>
          </div>

          <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="stops">Stops</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-4">
              <div className="bg-gray-100 rounded-lg h-[400px] flex items-center justify-center dark:bg-gray-800">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300">Interactive map would be displayed here</p>
                  <Button className="mt-4" onClick={simulateProgress}>
                    Simulate Progress
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stops" className="mt-4">
              <div className="space-y-4">
                <div className="relative pl-8 border-l-2 border-blue-500">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
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
                    <CheckCircle2 className="h-3 w-3 text-white" />
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
                    <Navigation className="h-3 w-3 text-white" />
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
                    <MapPin className="h-3 w-3 text-white" />
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

            <TabsContent value="students" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Student</th>
                      <th className="p-3 text-left font-medium">Pickup</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">
                        <div className="font-medium">Alex Thompson</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Grade 10</div>
                      </td>
                      <td className="p-3">Dagenham Heathway</td>
                      <td className="p-3">
                        <Badge variant="success">Boarded</Badge>
                      </td>
                      <td className="p-3 text-sm">None</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">
                        <div className="font-medium">Emma Thompson</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Grade 8</div>
                      </td>
                      <td className="p-3">Dagenham Heathway</td>
                      <td className="p-3">
                        <Badge variant="success">Boarded</Badge>
                      </td>
                      <td className="p-3 text-sm">None</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">
                        <div className="font-medium">Sophia Harris</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Grade 11</div>
                      </td>
                      <td className="p-3">Becontree Heath</td>
                      <td className="p-3">
                        <Badge variant="success">Boarded</Badge>
                      </td>
                      <td className="p-3 text-sm">None</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">
                        <div className="font-medium">William Harris</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Grade 7</div>
                      </td>
                      <td className="p-3">Becontree Heath</td>
                      <td className="p-3">
                        <Badge variant="warning">Absent</Badge>
                      </td>
                      <td className="p-3 text-sm">Parent called - sick today</td>
                    </tr>
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
        <div className="space-x-2">
          <Button variant="outline">Report Issue</Button>
          <Button>Complete Route</Button>
        </div>
      </div>
    </div>
  )
}

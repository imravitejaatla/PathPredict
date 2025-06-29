"use client"

import { Bus, Users, Clock, CheckCircle, AlertTriangle, MapPin, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">📊 Daily Transport Summary</h2>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Buses Active Today */}
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Buses Active Today</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">12</span>
                  <span className="ml-2 text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2 from yesterday
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bus className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Fleet utilization</span>
                <span>80%</span>
              </div>
              <Progress value={80} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Total Students Checked-In */}
        <Card className="overflow-hidden border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Students Checked-In</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">327</span>
                  <span className="ml-2 text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    98% of expected
                  </span>
                </div>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Users className="h-6 w-6 text-indigo-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Attendance rate</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Average Delay Today */}
        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Delay Today</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">2.1</span>
                  <span className="text-xl ml-1">min</span>
                  <span className="ml-2 text-xs text-green-500 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.5 from yesterday
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Within acceptable range</span>
                <span>Yes</span>
              </div>
              <Progress value={30} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* On-Time Arrival Rate */}
        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">On-Time Arrival Rate</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">92.4</span>
                  <span className="text-xl ml-1">%</span>
                  <span className="ml-2 text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1.2% from last week
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Target: 90%</span>
                <span>Exceeding</span>
              </div>
              <Progress value={92.4} className="h-1.5" />
            </div>
          </CardContent>
        </Card>

        {/* Incidents Reported */}
        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Incidents Reported</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">3</span>
                  <span className="ml-2 text-xs text-amber-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1 from yesterday
                  </span>
                </div>
              </div>
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span>Minor</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  2
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span>Major</span>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  1
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Delayed Routes */}
        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Top 3 Delayed Routes</p>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold">Route Analysis</span>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    A
                  </div>
                  <span className="text-sm">Route A</span>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  +4.5 min
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    B
                  </div>
                  <span className="text-sm">Route B</span>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  +3.2 min
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold mr-2">
                    C
                  </div>
                  <span className="text-sm">Route C</span>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  +2.8 min
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

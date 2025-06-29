"use client"

import { useState } from "react"
import { ArrowLeft, Download, Filter, BarChart2, LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/components/ui/label"

interface ReportsAnalyticsProps {
  onBack: () => void
}

export function ReportsAnalytics({ onBack }: ReportsAnalyticsProps) {
  const [reportType, setReportType] = useState("usage")
  const [dateRange, setDateRange] = useState("last30days")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Reports & Analytics</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Routes</CardTitle>
            <CardDescription>Active transportation routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-muted-foreground mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Buses</CardTitle>
            <CardDescription>Buses currently in service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground mt-1">1 in maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Students Transported</CardTitle>
            <CardDescription>Daily average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-sm text-muted-foreground mt-1">98% attendance rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-medium">Transportation Analytics</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="report-type" className="whitespace-nowrap">
                  Report Type:
                </Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type" className="w-[180px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usage">Usage Statistics</SelectItem>
                    <SelectItem value="performance">Performance Metrics</SelectItem>
                    <SelectItem value="attendance">Student Attendance</SelectItem>
                    <SelectItem value="maintenance">Maintenance Records</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="date-range" className="whitespace-nowrap">
                  Date Range:
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range" className="w-[180px]">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="last90days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {dateRange === "custom" && (
                <div className="flex items-center gap-2">
                  <DatePicker date={startDate} setDate={setStartDate} />
                  <span>to</span>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              )}
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="charts" className="p-4">
          <TabsList className="mb-4">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Daily Ridership</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2 text-blue-500" />
                    <p>Line chart showing daily student ridership</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Route Utilization</CardTitle>
                    <BarChart2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <BarChart2 className="h-16 w-16 mx-auto mb-2 text-blue-500" />
                    <p>Bar chart showing route utilization percentages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">On-Time Performance</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2 text-blue-500" />
                    <p>Line chart showing on-time performance trends</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Transportation Mode Distribution</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2 text-blue-500" />
                    <p>Pie chart showing transportation mode distribution</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tables">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Detailed Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="p-3 text-left font-medium">Route</th>
                        <th className="p-3 text-left font-medium">Bus</th>
                        <th className="p-3 text-left font-medium">Avg. Passengers</th>
                        <th className="p-3 text-left font-medium">Capacity %</th>
                        <th className="p-3 text-left font-medium">On-Time %</th>
                        <th className="p-3 text-left font-medium">Avg. Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Morning Route #103</td>
                        <td className="p-3">Bus #103</td>
                        <td className="p-3">38</td>
                        <td className="p-3">90%</td>
                        <td className="p-3">98%</td>
                        <td className="p-3">25 min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Afternoon Route #103</td>
                        <td className="p-3">Bus #103</td>
                        <td className="p-3">42</td>
                        <td className="p-3">100%</td>
                        <td className="p-3">95%</td>
                        <td className="p-3">27 min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Morning Route #215</td>
                        <td className="p-3">Bus #215</td>
                        <td className="p-3">32</td>
                        <td className="p-3">67%</td>
                        <td className="p-3">97%</td>
                        <td className="p-3">20 min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Afternoon Route #215</td>
                        <td className="p-3">Bus #215</td>
                        <td className="p-3">35</td>
                        <td className="p-3">73%</td>
                        <td className="p-3">94%</td>
                        <td className="p-3">22 min</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">EL1 Transit Route</td>
                        <td className="p-3">Bus #EL1</td>
                        <td className="p-3">45</td>
                        <td className="p-3">75%</td>
                        <td className="p-3">92%</td>
                        <td className="p-3">35 min</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Key Findings</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Overall on-time performance is 95.2%, exceeding the target of 90%</li>
                        <li>Route #103 has the highest utilization at 95% capacity</li>
                        <li>Student attendance via school transportation is 98%</li>
                        <li>Average journey time has decreased by 3 minutes compared to last month</li>
                        <li>Fuel efficiency has improved by 5% due to optimized routes</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Consider adding capacity to Route #103 during afternoon runs</li>
                        <li>Evaluate Route #215 for potential optimization due to lower utilization</li>
                        <li>Implement preventive maintenance for Bus #087 based on performance metrics</li>
                        <li>Review stop locations on EL1 Transit Route to improve on-time performance</li>
                        <li>Consider additional express service between high-density residential areas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

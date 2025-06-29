"use client"

import { useState } from "react"
import { ArrowLeft, Truck, AlertTriangle, CheckCircle2, Wrench, Fuel, Gauge, ThermometerSnowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface VehicleStatusViewProps {
  onBack: () => void
}

export function VehicleStatusView({ onBack }: VehicleStatusViewProps) {
  const [issueType, setIssueType] = useState("")
  const [issueDescription, setIssueDescription] = useState("")
  const [isReportSubmitted, setIsReportSubmitted] = useState(false)

  const handleSubmitIssue = () => {
    // In a real app, this would send the issue to a backend
    setIsReportSubmitted(true)
    setTimeout(() => {
      setIssueType("")
      setIssueDescription("")
      setIsReportSubmitted(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Vehicle Status</h2>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Bus #103
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle ID</p>
                  <p className="font-medium">B001</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                  <p className="font-medium">School Bus</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Capacity</p>
                  <p className="font-medium">42 seats</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Maintenance</p>
                  <p className="font-medium">2025-03-15</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Next Maintenance</p>
                  <p className="font-medium">2025-05-15</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3">Current Status</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <Fuel className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">Fuel Level</span>
                      </div>
                      <span className="text-sm">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <Gauge className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">Tire Pressure</span>
                      </div>
                      <span className="text-sm">Good</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <ThermometerSnowflake className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">A/C System</span>
                      </div>
                      <span className="text-sm">Operational</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Report an Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger id="issue-type">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mechanical">Mechanical Issue</SelectItem>
                    <SelectItem value="electrical">Electrical Issue</SelectItem>
                    <SelectItem value="tire">Tire/Wheel Issue</SelectItem>
                    <SelectItem value="interior">Interior Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="issue-description">Description</Label>
                <Textarea
                  id="issue-description"
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled={!issueType || !issueDescription || isReportSubmitted}>
                      {isReportSubmitted ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Issue Reported
                        </>
                      ) : (
                        "Submit Issue Report"
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Issue Report</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to submit this issue report? This will alert the maintenance team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        <strong>Issue Type:</strong> {issueType}
                      </p>
                      <p>
                        <strong>Description:</strong> {issueDescription}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitIssue}>Confirm Submission</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-500" />
            Maintenance History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="history">Maintenance History</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Description</th>
                      <th className="p-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">2025-03-15</td>
                      <td className="p-3">Routine Service</td>
                      <td className="p-3">Regular 10,000 mile service</td>
                      <td className="p-3">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">2025-02-10</td>
                      <td className="p-3">Tire Replacement</td>
                      <td className="p-3">Replaced front tires</td>
                      <td className="p-3">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">2025-01-05</td>
                      <td className="p-3">Oil Change</td>
                      <td className="p-3">Oil and filter replacement</td>
                      <td className="p-3">
                        <Badge variant="success">Completed</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">2025-05-15</td>
                      <td className="p-3">Routine Service</td>
                      <td className="p-3">Regular 15,000 mile service</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="p-3">2025-04-25</td>
                      <td className="p-3">Brake Inspection</td>
                      <td className="p-3">Scheduled brake system inspection</td>
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
      </div>
    </div>
  )
}

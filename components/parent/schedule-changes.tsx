"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ScheduleChangesViewProps {
  onBack: () => void
}

export function ScheduleChangesView({ onBack }: ScheduleChangesViewProps) {
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false)

  // Sample schedule changes data
  const scheduleChanges = [
    {
      id: 1,
      type: "absence",
      child: "Alex Thompson",
      date: "2025-04-20",
      status: "approved",
      details: "Sick day",
      requestedOn: "2025-04-19",
    },
    {
      id: 2,
      type: "alternate-pickup",
      child: "Emma Thompson",
      date: "2025-04-22",
      status: "pending",
      details: "Dentist appointment, will be picked up by grandmother",
      requestedOn: "2025-04-19",
    },
    {
      id: 3,
      type: "system",
      affectedRoutes: ["Morning Route #103", "Afternoon Route #103"],
      date: "2025-04-25",
      details: "Early dismissal day - afternoon pickup will be 1 hour earlier",
      announcedOn: "2025-04-18",
    },
  ]

  const handleSubmitRequest = () => {
    setIsRequestSubmitted(true)
    setTimeout(() => {
      setIsRequestSubmitted(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Schedule Changes</h2>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Request Change</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Schedule Change</DialogTitle>
              <DialogDescription>
                Submit a request for a transportation schedule change for your child.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="child" className="text-right">
                  Child
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select child" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Thompson</SelectItem>
                    <SelectItem value="emma">Emma Thompson</SelectItem>
                    <SelectItem value="michael">Michael Thompson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="change-type" className="text-right">
                  Change Type
                </Label>
                <RadioGroup defaultValue="absence" className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absence" id="absence" />
                    <Label htmlFor="absence">Absence</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alternate-pickup" id="alternate-pickup" />
                    <Label htmlFor="alternate-pickup">Alternate Pickup/Dropoff</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary-address" id="temporary-address" />
                    <Label htmlFor="temporary-address">Temporary Address Change</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="details" className="text-right">
                  Details
                </Label>
                <Textarea
                  id="details"
                  placeholder="Provide details about the schedule change..."
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmitRequest}>
                {isRequestSubmitted ? "Request Submitted!" : "Submit Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transportation Schedule Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="your-requests" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="your-requests">Your Requests</TabsTrigger>
              <TabsTrigger value="system-changes">System Changes</TabsTrigger>
            </TabsList>

            <TabsContent value="your-requests" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Child</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleChanges
                      .filter((change) => change.type !== "system")
                      .map((change) => (
                        <tr key={change.id} className="border-b dark:border-gray-700">
                          <td className="p-3">{change.child}</td>
                          <td className="p-3">{change.type === "absence" ? "Absence" : "Alternate Pickup"}</td>
                          <td className="p-3">{change.date}</td>
                          <td className="p-3">
                            <Badge
                              className={
                                change.status === "approved"
                                  ? "bg-green-500"
                                  : change.status === "pending"
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }
                            >
                              {change.status === "approved"
                                ? "Approved"
                                : change.status === "pending"
                                  ? "Pending"
                                  : "Rejected"}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="system-changes" className="mt-4 space-y-4">
              {scheduleChanges
                .filter((change) => change.type === "system")
                .map((change) => (
                  <div
                    key={change.id}
                    className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-medium text-amber-800 dark:text-amber-300">
                            Schedule Change: {change.date}
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50"
                          >
                            System Announcement
                          </Badge>
                        </div>
                        <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">{change.details}</p>
                        <div className="mt-3 text-xs text-amber-600 dark:text-amber-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Affected Routes: {change.affectedRoutes.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>Announced on: {change.announcedOn}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  MapPin,
  Users,
  Truck,
  MessageSquare,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Bell,
  PlayCircle,
  Clock,
  AlertCircle,
  PhoneCall,
  ClipboardCheck,
  ThermometerSun,
  BarChart2,
  BadgeCheck,
  CheckCircle,
  Send,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { TodaysRouteView } from "@/components/driver/todays-route"
import { StudentCheckInView } from "@/components/driver/student-check-in"
import { VehicleStatusView } from "@/components/driver/vehicle-status"
import { CommunicationView } from "@/components/driver/communication"
import { ScheduleView } from "@/components/driver/schedule"
import { EmergencyProtocolsView } from "@/components/driver/emergency-protocols"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DriverDashboard() {
  const { theme } = useTheme()
  const [activeView, setActiveView] = useState<string | null>(null)

  // Dialog states
  const [inspectionDialogOpen, setInspectionDialogOpen] = useState(false)
  const [issueDialogOpen, setIssueDialogOpen] = useState(false)
  const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false)

  // Form states
  const [inspectionForm, setInspectionForm] = useState({
    exteriorChecked: false,
    tiresChecked: false,
    lightsChecked: false,
    interiorChecked: false,
    emergencyEquipmentChecked: false,
    fluidsChecked: false,
    notes: "",
  })

  const [issueForm, setIssueForm] = useState({
    issueType: "",
    severity: "",
    description: "",
    location: "",
  })

  const [dispatchForm, setDispatchForm] = useState({
    messageType: "question",
    message: "",
  })

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null)

  // Mock data for the driver profile
  const driverData = {
    name: "Michael Johnson",
    avatar: "/diverse-driver-avatars.png",
    status: "On Duty",
    hoursToday: "3.5",
    hoursWeek: "18.5",
    safetyScore: "98%",
    routeStats: {
      students: 42,
      distance: "28.5 mi",
      estimatedTime: "45 min",
      completionPercentage: 0,
      nextStop: "Oakwood Elementary",
      nextStopTime: "8:15 AM",
    },
    notifications: [
      { id: 1, type: "alert", message: "Road closure on Main St. Use alternate route.", time: "7:05 AM" },
      { id: 2, type: "message", message: "Student Jacob Wilson will be absent today.", time: "6:50 AM" },
      { id: 3, type: "reminder", message: "Vehicle inspection due tomorrow.", time: "Yesterday" },
    ],
  }

  // Function to handle inspection form submission
  const handleInspectionSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionSuccess("inspection")

      // Reset and close after showing success
      setTimeout(() => {
        setSubmissionSuccess(null)
        setInspectionDialogOpen(false)
        setInspectionForm({
          exteriorChecked: false,
          tiresChecked: false,
          lightsChecked: false,
          interiorChecked: false,
          emergencyEquipmentChecked: false,
          fluidsChecked: false,
          notes: "",
        })
      }, 1500)
    }, 1000)
  }

  // Function to handle issue form submission
  const handleIssueSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionSuccess("issue")

      // Reset and close after showing success
      setTimeout(() => {
        setSubmissionSuccess(null)
        setIssueDialogOpen(false)
        setIssueForm({
          issueType: "",
          severity: "",
          description: "",
          location: "",
        })
      }, 1500)
    }, 1000)
  }

  // Function to handle dispatch message submission
  const handleDispatchSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionSuccess("dispatch")

      // Reset and close after showing success
      setTimeout(() => {
        setSubmissionSuccess(null)
        setDispatchDialogOpen(false)
        setDispatchForm({
          messageType: "question",
          message: "",
        })
      }, 1500)
    }, 1000)
  }

  // Function to render the active view content
  const renderActiveView = () => {
    switch (activeView) {
      case "todays-route":
        return <TodaysRouteView onBack={() => setActiveView(null)} />
      case "student-check-in":
        return <StudentCheckInView onBack={() => setActiveView(null)} />
      case "vehicle-status":
        return <VehicleStatusView onBack={() => setActiveView(null)} />
      case "communication":
        return <CommunicationView onBack={() => setActiveView(null)} />
      case "schedule":
        return <ScheduleView onBack={() => setActiveView(null)} />
      case "emergency-protocols":
        return <EmergencyProtocolsView onBack={() => setActiveView(null)} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${theme === "dark" ? "dark bg-gray-900" : ""}`}>
      <DashboardHeader />

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Driver Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {activeView ? (
          renderActiveView()
        ) : (
          <>
            {/* Enhanced Welcome Panel */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 dark:bg-gray-900 dark:border dark:border-gray-800">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Driver Profile Section */}
                <div className="flex items-start gap-4 md:w-1/3">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-100 dark:border-blue-900">
                      <Image
                        src={driverData.avatar || "/placeholder.svg"}
                        alt="Driver profile"
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full border-2 border-white dark:border-gray-900">
                      <BadgeCheck className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">
                        Good morning, {driverData.name}
                      </h2>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                      >
                        {driverData.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome to the Driver Dashboard</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-400">{driverData.hoursToday} hrs today</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-400">Safety: {driverData.safetyScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Section */}
                <div className="md:w-1/3 border-t md:border-t-0 md:border-l md:border-r border-gray-200 dark:border-gray-700 py-4 md:py-0 md:px-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">TODAY'S ROUTE</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Students</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {driverData.routeStats.students}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Distance</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {driverData.routeStats.distance}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Est. Time</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {driverData.routeStats.estimatedTime}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <ThermometerSun className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weather</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">72°F Clear</p>
                    </div>
                  </div>
                </div>

                {/* Notifications Section */}
                <div className="md:w-1/3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">RECENT NOTIFICATIONS</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                      {driverData.notifications.length}
                    </Badge>
                  </div>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2">
                    {driverData.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-800/50 text-sm"
                      >
                        {notification.type === "alert" && (
                          <AlertCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                        )}
                        {notification.type === "message" && (
                          <MessageSquare className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        )}
                        {notification.type === "reminder" && (
                          <Bell className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-gray-700 dark:text-gray-300">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Start Route
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setInspectionDialogOpen(true)}
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    Vehicle Inspection
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setIssueDialogOpen(true)}
                  >
                    <AlertCircle className="h-4 w-4" />
                    Report Issue
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setDispatchDialogOpen(true)}
                  >
                    <PhoneCall className="h-4 w-4" />
                    Contact Dispatch
                  </Button>
                </div>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                icon={MapPin}
                title="Today's Route"
                description="View and navigate your assigned route for today."
                onClick={() => setActiveView("todays-route")}
              />
              <DashboardCard
                icon={Users}
                title="Student Check-in"
                description="Manage student attendance and check-in/check-out."
                onClick={() => setActiveView("student-check-in")}
              />
              <DashboardCard
                icon={Truck}
                title="Vehicle Status"
                description="Report vehicle issues and view maintenance status."
                onClick={() => setActiveView("vehicle-status")}
              />
              <DashboardCard
                icon={MessageSquare}
                title="Communication"
                description="Send and receive messages from dispatch and parents."
                onClick={() => setActiveView("communication")}
              />
              <DashboardCard
                icon={Calendar}
                title="Schedule"
                description="View your upcoming driving assignments and schedule."
                onClick={() => setActiveView("schedule")}
              />
              <DashboardCard
                icon={AlertTriangle}
                title="Emergency Protocols"
                description="Access emergency procedures and contact information."
                onClick={() => setActiveView("emergency-protocols")}
              />
            </div>

            {/* Vehicle Inspection Dialog */}
            <Dialog open={inspectionDialogOpen} onOpenChange={setInspectionDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                    Vehicle Inspection
                  </DialogTitle>
                  <DialogDescription>Complete the pre-trip inspection checklist for your vehicle.</DialogDescription>
                </DialogHeader>

                {submissionSuccess === "inspection" ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Inspection Submitted</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Your vehicle inspection has been recorded successfully.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="exterior"
                            checked={inspectionForm.exteriorChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, exteriorChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="exterior">Exterior (body, mirrors, windows)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tires"
                            checked={inspectionForm.tiresChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, tiresChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="tires">Tires & Wheels</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lights"
                            checked={inspectionForm.lightsChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, lightsChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="lights">Lights & Signals</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="interior"
                            checked={inspectionForm.interiorChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, interiorChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="interior">Interior (seats, floor, controls)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="emergency"
                            checked={inspectionForm.emergencyEquipmentChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, emergencyEquipmentChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="emergency">Emergency Equipment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fluids"
                            checked={inspectionForm.fluidsChecked}
                            onCheckedChange={(checked) =>
                              setInspectionForm({ ...inspectionForm, fluidsChecked: checked as boolean })
                            }
                          />
                          <Label htmlFor="fluids">Fluid Levels</Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Enter any issues or observations..."
                          value={inspectionForm.notes}
                          onChange={(e) => setInspectionForm({ ...inspectionForm, notes: e.target.value })}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setInspectionDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleInspectionSubmit}
                        disabled={
                          isSubmitting ||
                          !(
                            inspectionForm.exteriorChecked &&
                            inspectionForm.tiresChecked &&
                            inspectionForm.lightsChecked &&
                            inspectionForm.interiorChecked &&
                            inspectionForm.emergencyEquipmentChecked &&
                            inspectionForm.fluidsChecked
                          )
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Inspection"
                        )}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Report Issue Dialog */}
            <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Report an Issue
                  </DialogTitle>
                  <DialogDescription>Report any issues with your vehicle, route, or other concerns.</DialogDescription>
                </DialogHeader>

                {submissionSuccess === "issue" ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Issue Reported</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Your issue has been reported and will be addressed promptly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="issue-type">Issue Type</Label>
                          <Select
                            value={issueForm.issueType}
                            onValueChange={(value) => setIssueForm({ ...issueForm, issueType: value })}
                          >
                            <SelectTrigger id="issue-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mechanical">Mechanical</SelectItem>
                              <SelectItem value="electrical">Electrical</SelectItem>
                              <SelectItem value="route">Route Problem</SelectItem>
                              <SelectItem value="student">Student Issue</SelectItem>
                              <SelectItem value="safety">Safety Concern</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="severity">Severity</Label>
                          <Select
                            value={issueForm.severity}
                            onValueChange={(value) => setIssueForm({ ...issueForm, severity: value })}
                          >
                            <SelectTrigger id="severity">
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low - Not Urgent</SelectItem>
                              <SelectItem value="medium">Medium - Attention Needed</SelectItem>
                              <SelectItem value="high">High - Urgent</SelectItem>
                              <SelectItem value="critical">Critical - Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location/Area</Label>
                        <Input
                          id="location"
                          placeholder="Where is the issue located?"
                          value={issueForm.location}
                          onChange={(e) => setIssueForm({ ...issueForm, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the issue in detail..."
                          rows={4}
                          value={issueForm.description}
                          onChange={(e) => setIssueForm({ ...issueForm, description: e.target.value })}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIssueDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleIssueSubmit}
                        disabled={isSubmitting || !issueForm.issueType || !issueForm.severity || !issueForm.description}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Report"
                        )}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Contact Dispatch Dialog */}
            <Dialog open={dispatchDialogOpen} onOpenChange={setDispatchDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-blue-600" />
                    Contact Dispatch
                  </DialogTitle>
                  <DialogDescription>Send a message to dispatch for assistance or information.</DialogDescription>
                </DialogHeader>

                {submissionSuccess === "dispatch" ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Message Sent</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Your message has been sent to dispatch. They will respond shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label>Message Type</Label>
                        <RadioGroup
                          defaultValue="question"
                          value={dispatchForm.messageType}
                          onValueChange={(value) => setDispatchForm({ ...dispatchForm, messageType: value })}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="question" id="question" />
                            <Label htmlFor="question">Question</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="update" id="update" />
                            <Label htmlFor="update">Status Update</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="request" id="request" />
                            <Label htmlFor="request">Request Assistance</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Type your message here..."
                          rows={4}
                          value={dispatchForm.message}
                          onChange={(e) => setDispatchForm({ ...dispatchForm, message: e.target.value })}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDispatchDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDispatchSubmit}
                        disabled={isSubmitting || !dispatchForm.message}
                        className="gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
      </main>
    </div>
  )
}

interface DashboardCardProps {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
}

function DashboardCard({ icon: Icon, title, description, onClick }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">{description}</p>
      <Button
        variant="ghost"
        className="text-blue-600 p-0 h-auto flex items-center dark:text-blue-400"
        onClick={onClick}
      >
        View <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

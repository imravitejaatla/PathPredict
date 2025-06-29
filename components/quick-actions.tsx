"use client"

import { useState } from "react"
import { PhoneCall, AlertCircle, ClipboardCheck, Loader2, CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
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

type QuickActionsProps = {}

export function QuickActions({}: QuickActionsProps) {
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

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setInspectionDialogOpen(true)}>
          <ClipboardCheck className="h-4 w-4" />
          Vehicle Inspection
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIssueDialogOpen(true)}>
          <AlertCircle className="h-4 w-4" />
          Report Issue
        </Button>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setDispatchDialogOpen(true)}>
          <PhoneCall className="h-4 w-4" />
          Contact Dispatch
        </Button>
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
  )
}

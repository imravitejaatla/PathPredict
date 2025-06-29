"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, Phone, Car, CloudSnow, ArrowLeft, Stethoscope } from "lucide-react"

interface EmergencyProtocolsViewProps {
  onBack: () => void
}

export function EmergencyProtocolsView({ onBack }: EmergencyProtocolsViewProps) {
  const [emergencyType, setEmergencyType] = useState("medical")
  const [isReportSubmitted, setIsReportSubmitted] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Emergency Protocols</h2>
        </div>
      </div>

      <Card className="col-span-3">
        <CardHeader className="bg-red-50 dark:bg-red-950">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <CardTitle>Emergency Protocols</CardTitle>
          </div>
          <CardDescription>Critical procedures for emergency situations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-4 h-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="p-4">
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-md border border-amber-200 dark:border-amber-800">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Priority Protocol
                  </h3>
                  <p className="text-sm mt-1">
                    Always ensure student safety first. Stop the bus in a safe location, activate hazard lights, and
                    assess the situation.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Emergency Contacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Phone className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">Dispatch Center</p>
                        <p className="text-sm text-muted-foreground">555-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <Phone className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <p className="font-medium">Emergency Services</p>
                        <p className="text-sm text-muted-foreground">911</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Reporting Procedure</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Ensure all students are safe and accounted for</li>
                    <li>Contact dispatch with your bus number and location</li>
                    <li>Provide a brief description of the emergency</li>
                    <li>Follow instructions from dispatch</li>
                    <li>Document the incident as soon as possible</li>
                  </ol>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="mt-4">
                        Report Emergency
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Report Emergency Situation</DialogTitle>
                        <DialogDescription>
                          Provide details about the current emergency. This will be sent to dispatch immediately.
                        </DialogDescription>
                      </DialogHeader>

                      {!isReportSubmitted ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            setIsReportSubmitted(true)
                          }}
                        >
                          <div className="space-y-4 py-2">
                            <div className="space-y-2">
                              <Label htmlFor="emergency-type">Emergency Type</Label>
                              <RadioGroup
                                defaultValue="medical"
                                value={emergencyType}
                                onValueChange={setEmergencyType}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="medical" id="medical" />
                                  <Label htmlFor="medical" className="flex items-center">
                                    <Stethoscope className="h-4 w-4 mr-2 text-red-500" />
                                    Medical Emergency
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="vehicle" id="vehicle" />
                                  <Label htmlFor="vehicle" className="flex items-center">
                                    <Car className="h-4 w-4 mr-2 text-orange-500" />
                                    Vehicle Issue
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="weather" id="weather" />
                                  <Label htmlFor="weather" className="flex items-center">
                                    <CloudSnow className="h-4 w-4 mr-2 text-blue-500" />
                                    Weather Condition
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id="other" />
                                  <Label htmlFor="other">Other</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="location">Current Location</Label>
                              <Textarea
                                id="location"
                                placeholder="Describe your current location as precisely as possible"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description">Emergency Description</Label>
                              <Textarea id="description" placeholder="Describe the emergency situation in detail" />
                            </div>

                            <div className="space-y-2">
                              <Label>Student Status</Label>
                              <RadioGroup defaultValue="safe">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="safe" id="safe" />
                                  <Label htmlFor="safe">All students safe and accounted for</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="injured" id="injured" />
                                  <Label htmlFor="injured">Student injuries reported</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="unknown" id="unknown" />
                                  <Label htmlFor="unknown">Status unknown/still assessing</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" variant="destructive">
                              Submit Emergency Report
                            </Button>
                          </DialogFooter>
                        </form>
                      ) : (
                        <div className="py-6 text-center space-y-4">
                          <div className="bg-green-50 dark:bg-green-900 p-4 rounded-md">
                            <p className="text-green-700 dark:text-green-300 font-medium">
                              Emergency report submitted successfully!
                            </p>
                            <p className="text-sm mt-1">Dispatch has been notified and help is on the way.</p>
                          </div>
                          <Button onClick={() => setIsReportSubmitted(false)}>Submit Another Report</Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="p-4">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md border border-red-200 dark:border-red-800">
                  <h3 className="font-bold text-red-800 dark:text-red-300 flex items-center">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Medical Emergency Protocol
                  </h3>
                  <p className="text-sm mt-1">
                    For serious medical emergencies, call 911 immediately. Do not attempt to transport students with
                    serious injuries.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">First Aid Procedures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Allergic Reaction</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Check for medical alert bracelet</li>
                          <li>Call dispatch immediately</li>
                          <li>If EpiPen is available and you're trained, assist with administration</li>
                          <li>Keep student calm and monitor breathing</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Seizure</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Time the seizure</li>
                          <li>Clear area around student</li>
                          <li>Do not restrain or put anything in mouth</li>
                          <li>Place something soft under head</li>
                          <li>Call 911 if seizure lasts &gt;5 minutes</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Bleeding/Cuts</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Apply direct pressure with clean cloth</li>
                          <li>Elevate injured area if possible</li>
                          <li>For severe bleeding, call 911</li>
                          <li>Use first aid kit supplies</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Asthma Attack</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Help student sit upright</li>
                          <li>Assist with inhaler if available</li>
                          <li>Keep calm, encourage slow breathing</li>
                          <li>Call 911 if breathing difficulty persists</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">First Aid Kit Location</h3>
                  <p className="text-sm">
                    The first aid kit is located in the storage compartment behind the driver's seat. A secondary kit is
                    under the first seat on the right side of the bus.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md border border-blue-200 dark:border-blue-800 mt-2">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Remember:</strong> Document all first aid administered in the incident report. Note the
                      time, student name, and actions taken.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="p-4">
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-md border border-orange-200 dark:border-orange-800">
                  <h3 className="font-bold text-orange-800 dark:text-orange-300 flex items-center">
                    <Car className="h-4 w-4 mr-2" />
                    Vehicle Emergency Protocol
                  </h3>
                  <p className="text-sm mt-1">
                    If the bus breaks down or is involved in an accident, prioritize student safety and follow these
                    procedures.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Breakdown Procedures</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Pull over to a safe location away from traffic</li>
                    <li>Activate hazard lights and set out reflective triangles</li>
                    <li>Contact dispatch with your location and nature of breakdown</li>
                    <li>Keep students on the bus unless unsafe to do so</li>
                    <li>If evacuation is necessary, follow evacuation procedures</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Accident Procedures</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check for injuries and provide first aid as needed</li>
                    <li>Call 911 if there are injuries or significant damage</li>
                    <li>Contact dispatch immediately</li>
                    <li>Exchange information with other drivers if applicable</li>
                    <li>Document the scene with photos if possible</li>
                    <li>Complete accident report form</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Evacuation Procedures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="font-medium text-sm">Front Door Evacuation</h4>
                      <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                        <li>Announce evacuation calmly</li>
                        <li>Students exit row by row from front to back</li>
                        <li>Designate helpers for younger students</li>
                        <li>Lead students to safe area 100 ft from bus</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                      <h4 className="font-medium text-sm">Rear Door Evacuation</h4>
                      <ul className="list-disc list-inside text-xs space-y-1 mt-1">
                        <li>Use when front exit is blocked</li>
                        <li>Assign older students to help at exit</li>
                        <li>Students exit row by row from back to front</li>
                        <li>Ensure all students are accounted for</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weather" className="p-4">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 flex items-center">
                    <CloudSnow className="h-4 w-4 mr-2" />
                    Weather Emergency Protocol
                  </h3>
                  <p className="text-sm mt-1">
                    Severe weather requires special precautions. Always prioritize safety over schedule.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Severe Weather Procedures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Tornado</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>If warning issued, seek shelter immediately</li>
                          <li>Evacuate bus to nearest sturdy building</li>
                          <li>If no building, direct students to lie flat in lowest area</li>
                          <li>Keep away from bus</li>
                          <li>Cover head and neck</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Flooding</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Never drive through flooded roads</li>
                          <li>Turn around and find alternate route</li>
                          <li>If water is rising, move to higher ground</li>
                          <li>Contact dispatch for route assistance</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Winter Storm</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Reduce speed and increase following distance</li>
                          <li>If conditions worsen, pull over safely</li>
                          <li>Keep bus running for heat if safe</li>
                          <li>Contact dispatch for instructions</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Lightning</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <ul className="list-disc list-inside text-xs space-y-1">
                          <li>Bus is safe shelter during lightning</li>
                          <li>Keep students inside the bus</li>
                          <li>Avoid touching metal surfaces</li>
                          <li>Wait 30 minutes after last lightning before resuming</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold">Communication During Weather Emergencies</h3>
                  <p className="text-sm">
                    Maintain regular contact with dispatch during severe weather. Report road conditions and receive
                    updates on weather advisories. If communication is lost, follow standard procedures and use best
                    judgment to ensure student safety.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

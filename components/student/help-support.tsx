"use client"

import { useState } from "react"
import { ArrowLeft, HelpCircle, Phone, Mail, MessageSquare, FileText, Download, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface HelpSupportViewProps {
  onBack: () => void
}

export function HelpSupportView({ onBack }: HelpSupportViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [messageText, setMessageText] = useState("")
  const [messageSent, setMessageSent] = useState(false)

  // Sample FAQs
  const faqs = [
    {
      id: 1,
      question: "What should I do if I miss my bus?",
      answer:
        "If you miss your bus, please contact the transportation office immediately at 020-1234-5678. They will help arrange alternative transportation if possible. You should also notify your parents/guardians.",
    },
    {
      id: 2,
      question: "How do I report a change in my pickup/dropoff location?",
      answer:
        "Your parent or guardian needs to submit a schedule change request through their parent dashboard. They can access this by logging into their account and selecting 'Schedule Changes' from the dashboard.",
    },
    {
      id: 3,
      question: "What happens if my bus is running late?",
      answer:
        "If your bus is running late, you will receive a notification through the app. The notification will include the estimated delay time. You can also check the 'My Bus' section of your dashboard for real-time updates.",
    },
    {
      id: 4,
      question: "How do I report an issue with my bus or driver?",
      answer:
        "You can report any issues through the 'Contact Support' tab in the Help & Support section. Alternatively, you can call the transportation office directly at 020-1234-5678.",
    },
    {
      id: 5,
      question: "What are the pickup and dropoff locations for Route #103?",
      answer:
        "Route #103 serves the area between Dagenham (RM10 9QB) and UEL Docklands Campus (E16 2RD). The main pickup points are Dagenham Heathway, Becontree Heath, and A13 Junction. For a complete list of stops, please check the 'Schedule' section.",
    },
  ]

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sample resources
  const resources = [
    {
      id: 1,
      title: "Student Transportation Handbook",
      description: "Complete guide to school transportation policies and procedures.",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Bus Safety Guidelines",
      description: "Important safety rules and guidelines for riding the school bus.",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      id: 3,
      title: "Transportation Schedule",
      description: "Complete schedule of all bus routes and times.",
      type: "PDF",
      size: "0.8 MB",
    },
    {
      id: 4,
      title: "Bus Route Maps",
      description: "Detailed maps of all school bus routes.",
      type: "PDF",
      size: "3.5 MB",
    },
  ]

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    // In a real app, this would send the message to a backend
    setMessageSent(true)
    setTimeout(() => {
      setMessageText("")
      setMessageSent(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Help & Support</h2>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transportation Support</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              Try house and school locations like "RM109QB" and "E162RD" for best results.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-4">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <HelpCircle className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No FAQs found matching your search</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contact" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Call our transportation office for immediate assistance.
                      </p>
                      <p className="text-sm font-medium mt-2">020-1234-5678</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Available Monday-Friday, 7:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Send us an email for non-urgent inquiries.
                      </p>
                      <p className="text-sm font-medium mt-2">transport@school.edu</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Response time: Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  Send a Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      rows={4}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageText.trim() || messageSent}>
                    {messageSent ? "Message Sent!" : "Send Message"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{resource.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
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

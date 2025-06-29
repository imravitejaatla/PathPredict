"use client"

import { useState } from "react"
import { ArrowLeft, Send, Search, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CommunicationViewProps {
  onBack: () => void
}

export function CommunicationView({ onBack }: CommunicationViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [messageText, setMessageText] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: "System Administrator",
      content: "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.",
      time: "15:42:12",
      isRead: true,
    },
    {
      id: 2,
      sender: "Dispatch",
      content: "Please confirm your arrival at UEL Docklands Campus.",
      time: "14:30:45",
      isRead: false,
    },
    {
      id: 3,
      sender: "David Thompson",
      content: "Will the bus be delayed today due to the roadworks?",
      time: "12:15:33",
      isRead: false,
    },
    {
      id: 4,
      sender: "Jennifer Lee",
      content: "Oliver will not be taking the bus today as he has a doctor's appointment.",
      time: "09:05:18",
      isRead: true,
    },
  ])

  const contacts = [
    { id: "dispatch", name: "Dispatch", role: "Transportation Coordinator", unread: 1 },
    { id: "admin", name: "System Administrator", role: "Admin", unread: 0 },
    { id: "david", name: "David Thompson", role: "Parent", unread: 1 },
    { id: "jennifer", name: "Jennifer Lee", role: "Parent", unread: 0 },
    { id: "richard", name: "Richard Harris", role: "Parent", unread: 0 },
    { id: "lisa", name: "Lisa Martinez", role: "Parent", unread: 0 },
  ]

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return

    // In a real app, this would send the message to a backend
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageText,
      time: new Date().toLocaleTimeString(),
      isRead: true,
    }

    setMessages([...messages, newMessage])
    setMessageText("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Communication</h2>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex">
          <Tabs defaultValue="messages" className="flex flex-col w-full">
            <div className="border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="messages" className="data-[state=active]:bg-transparent">
                  Messages
                </TabsTrigger>
                <TabsTrigger value="announcements" className="data-[state=active]:bg-transparent">
                  Announcements
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-transparent">
                  Alerts
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="messages" className="flex-1 flex data-[state=inactive]:hidden mt-0">
              <div className="w-1/3 border-r p-4 overflow-y-auto">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search contacts..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-2 rounded-md cursor-pointer flex items-center gap-3 ${
                        selectedContact === contact.id
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <Avatar>
                        <AvatarFallback>{contact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{contact.name}</p>
                          {contact.unread > 0 && (
                            <Badge
                              variant="default"
                              className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full"
                            >
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-2/3 flex flex-col">
                {selectedContact ? (
                  <>
                    <div className="p-4 border-b flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {contacts.find((c) => c.id === selectedContact)?.name[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {contacts.find((c) => c.id === selectedContact)?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {contacts.find((c) => c.id === selectedContact)?.role || ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <Button size="icon" onClick={handleSendMessage} disabled={!messageText.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Select a contact to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="flex-1 p-4 data-[state=inactive]:hidden mt-0">
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">System Maintenance</h3>
                    <Badge variant="outline" className="text-xs">
                      System
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                    Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.
                  </p>
                  <div className="flex items-center text-xs text-blue-600 dark:text-blue-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Posted: 15:42:12</span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-amber-800 dark:text-amber-300">Route Change Notice</h3>
                    <Badge
                      variant="outline"
                      className="text-xs bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50"
                    >
                      Transportation
                    </Badge>
                  </div>
                  <p className="text-sm text-amber-700 dark:text-amber-200 mb-2">
                    Due to roadworks on Main Street, all buses will be rerouted via Park Avenue until further notice.
                  </p>
                  <div className="flex items-center text-xs text-amber-600 dark:text-amber-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Posted: Yesterday, 10:15:30</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="flex-1 p-4 data-[state=inactive]:hidden mt-0">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-red-800 dark:text-red-300">Weather Alert</h3>
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-200 mb-2">
                    Heavy snowfall expected tomorrow. All morning routes may experience delays of 10-15 minutes.
                  </p>
                  <div className="flex items-center text-xs text-red-600 dark:text-red-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Posted: 16:00:00</span>
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

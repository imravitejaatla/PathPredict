"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Send, Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface NotificationsProps {
  onBack: () => void
}

// Sample data
const NOTIFICATIONS = [
  {
    id: "N001",
    title: "System Maintenance",
    message: "The system will be down for maintenance on Sunday, April 21, 2025, from 2:00 AM to 4:00 AM.",
    type: "info",
    recipients: "All Users",
    sentBy: "System Administrator",
    sentAt: "2025-04-18T10:30:00",
    status: "Sent",
  },
  {
    id: "N002",
    title: "Route #103 Delay",
    message: "Route #103 is currently experiencing a 15-minute delay due to traffic congestion.",
    type: "warning",
    recipients: "Route #103 Users",
    sentBy: "Transportation Coordinator",
    sentAt: "2025-04-19T08:15:00",
    status: "Sent",
  },
  {
    id: "N003",
    title: "New Bus Added",
    message: "A new bus (Bus #156) has been added to the fleet and will be servicing the North Campus route.",
    type: "success",
    recipients: "All Users",
    sentBy: "Fleet Manager",
    sentAt: "2025-04-17T14:45:00",
    status: "Sent",
  },
  {
    id: "N004",
    title: "Weather Alert",
    message: "Due to expected heavy snowfall tomorrow, all morning routes may experience delays of 10-15 minutes.",
    type: "warning",
    recipients: "All Users",
    sentBy: "System Administrator",
    sentAt: "2025-04-19T16:00:00",
    status: "Scheduled",
  },
  {
    id: "N005",
    title: "Driver Change",
    message: "Please note that Route #215 will have a substitute driver for the next week due to planned leave.",
    type: "info",
    recipients: "Route #215 Users",
    sentBy: "Transportation Coordinator",
    sentAt: "2025-04-18T11:20:00",
    status: "Sent",
  },
]

export function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    recipients: "all",
    status: "draft",
  })

  const handleAddNotification = () => {
    const id = `N${String(notifications.length + 1).padStart(3, "0")}`
    const now = new Date().toISOString()
    setNotifications([
      ...notifications,
      {
        id,
        ...newNotification,
        sentBy: "Current User",
        sentAt: now,
        status: newNotification.status === "send" ? "Sent" : "Draft",
      },
    ])
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      recipients: "all",
      status: "draft",
    })
    setIsAddNotificationOpen(false)

    if (newNotification.status === "send") {
      toast({
        title: "Notification sent",
        description: "Your notification has been sent to the selected recipients.",
      })
    } else {
      toast({
        title: "Notification saved",
        description: "Your notification has been saved as a draft.",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-slate-500" />
    }
  }

  const getNotificationBadge = (status: string) => {
    switch (status) {
      case "Sent":
        return <Badge variant="success">Sent</Badge>
      case "Draft":
        return <Badge variant="outline">Draft</Badge>
      case "Scheduled":
        return <Badge variant="secondary">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <Dialog open={isAddNotificationOpen} onOpenChange={setIsAddNotificationOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>Compose a new notification to send to users.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-title">Title</Label>
                  <Input
                    id="notification-title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    placeholder="Enter notification title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-message">Message</Label>
                  <Textarea
                    id="notification-message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    placeholder="Enter notification message"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-type">Type</Label>
                    <Select
                      value={newNotification.type}
                      onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                    >
                      <SelectTrigger id="notification-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Information</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notification-recipients">Recipients</Label>
                    <Select
                      value={newNotification.recipients}
                      onValueChange={(value) => setNewNotification({ ...newNotification, recipients: value })}
                    >
                      <SelectTrigger id="notification-recipients">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="drivers">All Drivers</SelectItem>
                        <SelectItem value="parents">All Parents</SelectItem>
                        <SelectItem value="students">All Students</SelectItem>
                        <SelectItem value="route103">Route #103 Users</SelectItem>
                        <SelectItem value="route215">Route #215 Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewNotification({ ...newNotification, status: "draft" })
                    handleAddNotification()
                  }}
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => {
                    setNewNotification({ ...newNotification, status: "send" })
                    handleAddNotification()
                  }}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left font-medium">ID</th>
                      <th className="p-3 text-left font-medium">Title</th>
                      <th className="p-3 text-left font-medium">Recipients</th>
                      <th className="p-3 text-left font-medium">Sent By</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification) => (
                      <tr key={notification.id} className="border-b">
                        <td className="p-3">{notification.id}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getNotificationIcon(notification.type)}
                            {notification.title}
                          </div>
                        </td>
                        <td className="p-3">{notification.recipients}</td>
                        <td className="p-3">{notification.sentBy}</td>
                        <td className="p-3">{new Date(notification.sentAt).toLocaleString()}</td>
                        <td className="p-3">{getNotificationBadge(notification.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left font-medium">ID</th>
                      <th className="p-3 text-left font-medium">Title</th>
                      <th className="p-3 text-left font-medium">Recipients</th>
                      <th className="p-3 text-left font-medium">Sent By</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications
                      .filter((notification) => notification.status === "Sent")
                      .map((notification) => (
                        <tr key={notification.id} className="border-b">
                          <td className="p-3">{notification.id}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type)}
                              {notification.title}
                            </div>
                          </td>
                          <td className="p-3">{notification.recipients}</td>
                          <td className="p-3">{notification.sentBy}</td>
                          <td className="p-3">{new Date(notification.sentAt).toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left font-medium">ID</th>
                      <th className="p-3 text-left font-medium">Title</th>
                      <th className="p-3 text-left font-medium">Recipients</th>
                      <th className="p-3 text-left font-medium">Sent By</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications
                      .filter((notification) => notification.status === "Scheduled")
                      .map((notification) => (
                        <tr key={notification.id} className="border-b">
                          <td className="p-3">{notification.id}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type)}
                              {notification.title}
                            </div>
                          </td>
                          <td className="p-3">{notification.recipients}</td>
                          <td className="p-3">{notification.sentBy}</td>
                          <td className="p-3">{new Date(notification.sentAt).toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-3 text-left font-medium">ID</th>
                      <th className="p-3 text-left font-medium">Title</th>
                      <th className="p-3 text-left font-medium">Recipients</th>
                      <th className="p-3 text-left font-medium">Created By</th>
                      <th className="p-3 text-left font-medium">Date</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications
                      .filter((notification) => notification.status === "Draft")
                      .map((notification) => (
                        <tr key={notification.id} className="border-b">
                          <td className="p-3">{notification.id}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type)}
                              {notification.title}
                            </div>
                          </td>
                          <td className="p-3">{notification.recipients}</td>
                          <td className="p-3">{notification.sentBy}</td>
                          <td className="p-3">{new Date(notification.sentAt).toLocaleString()}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

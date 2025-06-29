"use client"

import { useState } from "react"
import { ArrowLeft, Bell, Info, AlertTriangle, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface NotificationsViewProps {
  onBack: () => void
}

export function NotificationsView({ onBack }: NotificationsViewProps) {
  const [notificationSettings, setNotificationSettings] = useState({
    busArrival: true,
    busDelay: true,
    checkInOut: true,
    scheduleChanges: true,
    emergencyAlerts: true,
    emailNotifications: true,
    pushNotifications: true,
  })

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "info",
      title: "Bus #103 Arrived",
      message: "Your bus has arrived at UEL Docklands Campus (E16 2RD).",
      time: "08:30 AM",
      date: "Today",
      isRead: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Bus #103 Delay",
      message: "Bus #103 is currently experiencing a 5-minute delay due to traffic.",
      time: "07:45 AM",
      date: "Today",
      isRead: true,
    },
    {
      id: 3,
      type: "success",
      title: "Check-in Confirmed",
      message: "You have successfully checked in to Bus #103 at Dagenham Heathway (RM10 9QB).",
      time: "07:30 AM",
      date: "Today",
      isRead: true,
    },
    {
      id: 4,
      type: "info",
      title: "Schedule Change Notice",
      message: "Tomorrow's afternoon pickup will be 15 minutes earlier due to early dismissal.",
      time: "03:30 PM",
      date: "Yesterday",
      isRead: true,
    },
  ]

  // Toggle notification setting
  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Notification Center</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription>
              Try house and school locations like "RM109QB" and "E162RD" for best results.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Notifications</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.isRead
                      ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{notification.title}</h3>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}, {notification.date}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="mt-4 space-y-4">
              {notifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30"
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}, {notification.date}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}

              {notifications.filter((n) => !n.isRead).length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                  <p>No unread notifications</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bus-arrival" className="flex flex-col gap-1">
                        <span>Bus Arrival Notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications when your bus arrives at school or home
                        </span>
                      </Label>
                      <Switch
                        id="bus-arrival"
                        checked={notificationSettings.busArrival}
                        onCheckedChange={() => toggleSetting("busArrival")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="bus-delay" className="flex flex-col gap-1">
                        <span>Bus Delay Alerts</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications about bus delays
                        </span>
                      </Label>
                      <Switch
                        id="bus-delay"
                        checked={notificationSettings.busDelay}
                        onCheckedChange={() => toggleSetting("busDelay")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="check-in-out" className="flex flex-col gap-1">
                        <span>Check-in/Check-out Notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications when you board or exit the bus
                        </span>
                      </Label>
                      <Switch
                        id="check-in-out"
                        checked={notificationSettings.checkInOut}
                        onCheckedChange={() => toggleSetting("checkInOut")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="schedule-changes" className="flex flex-col gap-1">
                        <span>Schedule Change Notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications about changes to the transportation schedule
                        </span>
                      </Label>
                      <Switch
                        id="schedule-changes"
                        checked={notificationSettings.scheduleChanges}
                        onCheckedChange={() => toggleSetting("scheduleChanges")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="emergency-alerts" className="flex flex-col gap-1">
                        <span>Emergency Alerts</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications about emergency situations
                        </span>
                      </Label>
                      <Switch
                        id="emergency-alerts"
                        checked={notificationSettings.emergencyAlerts}
                        onCheckedChange={() => toggleSetting("emergencyAlerts")}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                        <span>Email Notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications via email
                        </span>
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => toggleSetting("emailNotifications")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                        <span>Push Notifications</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receive notifications on your mobile device
                        </span>
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => toggleSetting("pushNotifications")}
                      />
                    </div>
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
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

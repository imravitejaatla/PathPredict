"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Clock, AlertTriangle, MessageSquare, Calendar, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
  category: "alerts" | "updates" | "reminders"
  icon: React.ReactNode
}

export function NotificationPreferences() {
  const { toast } = useToast()

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "bus-arrival",
      title: "Bus Arrival",
      description: "Receive notifications when the bus is approaching your stop",
      enabled: true,
      category: "alerts",
      icon: <Bell className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "bus-delay",
      title: "Bus Delays",
      description: "Get notified about any delays in the bus schedule",
      enabled: true,
      category: "alerts",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    },
    {
      id: "route-changes",
      title: "Route Changes",
      description: "Be informed about any changes to your child's bus route",
      enabled: true,
      category: "alerts",
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
    },
    {
      id: "check-in",
      title: "Check-in Notifications",
      description: "Receive alerts when your child checks in or out of the bus",
      enabled: true,
      category: "updates",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: "schedule-reminders",
      title: "Schedule Reminders",
      description: "Get reminders about upcoming transportation schedules",
      enabled: false,
      category: "reminders",
      icon: <Clock className="h-4 w-4 text-gray-500" />,
    },
    {
      id: "driver-messages",
      title: "Driver Messages",
      description: "Receive messages from bus drivers",
      enabled: true,
      category: "updates",
      icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
    },
  ])

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )

    // Show toast notification
    const setting = settings.find((s) => s.id === id)
    if (setting) {
      toast({
        title: `${setting.title} notifications ${!setting.enabled ? "enabled" : "disabled"}`,
        description: `You will ${!setting.enabled ? "now" : "no longer"} receive ${setting.title.toLowerCase()} notifications.`,
      })
    }
  }

  const getSettingsByCategory = (category: string) => {
    return settings.filter((setting) => setting.category === category)
  }

  const savePreferences = () => {
    // In a real app, you would save these preferences to a database
    toast({
      title: "Preferences saved",
      description: "Your notification preferences have been updated successfully.",
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-4 space-y-4">
            {getSettingsByCategory("alerts").map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    {setting.icon}
                    <Label htmlFor={setting.id} className="ml-2 font-medium">
                      {setting.title}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                </div>
                <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="updates" className="mt-4 space-y-4">
            {getSettingsByCategory("updates").map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    {setting.icon}
                    <Label htmlFor={setting.id} className="ml-2 font-medium">
                      {setting.title}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                </div>
                <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="reminders" className="mt-4 space-y-4">
            {getSettingsByCategory("reminders").map((setting) => (
              <div key={setting.id} className="flex items-center justify-between space-x-2">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center">
                    {setting.icon}
                    <Label htmlFor={setting.id} className="ml-2 font-medium">
                      {setting.title}
                    </Label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
                </div>
                <Switch id={setting.id} checked={setting.enabled} onCheckedChange={() => handleToggle(setting.id)} />
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={savePreferences}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

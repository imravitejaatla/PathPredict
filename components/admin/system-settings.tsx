"use client"

import { useState } from "react"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"

interface SystemSettingsProps {
  onBack: () => void
}

export function SystemSettings({ onBack }: SystemSettingsProps) {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "PathPredict School Transportation System",
    organizationName: "Demo School District",
    contactEmail: "admin@pathpredict.edu",
    timezone: "UTC+0",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    delayThreshold: 5,
    maintenanceReminders: true,
    routeChanges: true,
    attendanceAlerts: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    ipRestriction: false,
    dataEncryption: true,
    auditLogging: true,
  })

  const [mapSettings, setMapSettings] = useState({
    defaultZoom: 12,
    refreshInterval: 30,
    showTraffic: true,
    showWeather: false,
    mapProvider: "openstreetmap",
    routeColor: "#3388ff",
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your system settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">System Settings</h2>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="maps">Maps & Location</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input
                    id="system-name"
                    value={generalSettings.systemName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization-name">Organization Name</Label>
                  <Input
                    id="organization-name"
                    value={generalSettings.organizationName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, organizationName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="UTC+8">China Standard Time (UTC+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, dateFormat: value })}
                  >
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select
                    value={generalSettings.timeFormat}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timeFormat: value })}
                  >
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send notifications via email to users
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="flex flex-col gap-1">
                    <span>SMS Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send text messages for urgent notifications
                    </span>
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                    <span>Push Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send push notifications to mobile devices
                    </span>
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label htmlFor="delay-threshold" className="mb-2 flex flex-col gap-1">
                    <span>Delay Notification Threshold (minutes)</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send notifications when buses are delayed by this many minutes
                    </span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="delay-threshold"
                      value={[notificationSettings.delayThreshold]}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={(value) =>
                        setNotificationSettings({ ...notificationSettings, delayThreshold: value[0] })
                      }
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{notificationSettings.delayThreshold} min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-reminders" className="flex flex-col gap-1">
                    <span>Maintenance Reminders</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send notifications about scheduled maintenance
                    </span>
                  </Label>
                  <Switch
                    id="maintenance-reminders"
                    checked={notificationSettings.maintenanceReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, maintenanceReminders: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="route-changes" className="flex flex-col gap-1">
                    <span>Route Changes</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Notify users about changes to routes or schedules
                    </span>
                  </Label>
                  <Switch
                    id="route-changes"
                    checked={notificationSettings.routeChanges}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, routeChanges: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="attendance-alerts" className="flex flex-col gap-1">
                    <span>Attendance Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Notify parents when students check in/out of buses
                    </span>
                  </Label>
                  <Switch
                    id="attendance-alerts"
                    checked={notificationSettings.attendanceAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, attendanceAlerts: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access control settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor-auth" className="flex flex-col gap-1">
                    <span>Two-Factor Authentication</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </span>
                  </Label>
                  <Switch
                    id="two-factor-auth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-encryption" className="flex flex-col gap-1">
                    <span>Data Encryption</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Encrypt sensitive data in the database
                    </span>
                  </Label>
                  <Switch
                    id="data-encryption"
                    checked={securitySettings.dataEncryption}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, dataEncryption: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="audit-logging" className="flex flex-col gap-1">
                    <span>Audit Logging</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Log all administrative actions for audit purposes
                    </span>
                  </Label>
                  <Switch
                    id="audit-logging"
                    checked={securitySettings.auditLogging}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, auditLogging: checked })}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                    <Input
                      id="password-expiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, passwordExpiry: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ip-restriction" className="flex flex-col gap-1">
                    <span>IP Restriction</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Restrict admin access to specific IP addresses
                    </span>
                  </Label>
                  <Switch
                    id="ip-restriction"
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipRestriction: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maps" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maps & Location Settings</CardTitle>
              <CardDescription>Configure map display and location tracking settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="map-provider">Map Provider</Label>
                  <Select
                    value={mapSettings.mapProvider}
                    onValueChange={(value) => setMapSettings({ ...mapSettings, mapProvider: value })}
                  >
                    <SelectTrigger id="map-provider">
                      <SelectValue placeholder="Select map provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
                      <SelectItem value="google">Google Maps</SelectItem>
                      <SelectItem value="mapbox">Mapbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Location Refresh Interval (seconds)</Label>
                  <Input
                    id="refresh-interval"
                    type="number"
                    value={mapSettings.refreshInterval}
                    onChange={(e) =>
                      setMapSettings({ ...mapSettings, refreshInterval: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-zoom">Default Zoom Level</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="default-zoom"
                      value={[mapSettings.defaultZoom]}
                      min={5}
                      max={18}
                      step={1}
                      onValueChange={(value) => setMapSettings({ ...mapSettings, defaultZoom: value[0] })}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{mapSettings.defaultZoom}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="route-color">Route Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="route-color"
                      type="color"
                      value={mapSettings.routeColor}
                      onChange={(e) => setMapSettings({ ...mapSettings, routeColor: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={mapSettings.routeColor}
                      onChange={(e) => setMapSettings({ ...mapSettings, routeColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-traffic" className="flex flex-col gap-1">
                    <span>Show Traffic</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Display traffic information on maps
                    </span>
                  </Label>
                  <Switch
                    id="show-traffic"
                    checked={mapSettings.showTraffic}
                    onCheckedChange={(checked) => setMapSettings({ ...mapSettings, showTraffic: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-weather" className="flex flex-col gap-1">
                    <span>Show Weather</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Display weather information on maps
                    </span>
                  </Label>
                  <Switch
                    id="show-weather"
                    checked={mapSettings.showWeather}
                    onCheckedChange={(checked) => setMapSettings({ ...mapSettings, showWeather: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react"

interface ChildProfile {
  id: string
  name: string
  grade: string
  photo: string
  busRoute: string
  busNumber: string
  status: "on-bus" | "at-school" | "at-home" | "absent"
  nextPickup?: string
  nextDropoff?: string
  currentLocation?: string
}

export function ChildProfiles() {
  const [children, setChildren] = useState<ChildProfile[]>([
    {
      id: "1",
      name: "Alex Thompson",
      grade: "10",
      photo: "/playful-park-afternoon.png",
      busRoute: "Morning Route #103",
      busNumber: "Bus 103",
      status: "on-bus",
      nextDropoff: "3:15 PM",
      currentLocation: "Near Becontree Heath",
    },
    {
      id: "2",
      name: "Emma Thompson",
      grade: "8",
      photo: "/playful-park-afternoon.png",
      busRoute: "Morning Route #103",
      busNumber: "Bus 103",
      status: "at-school",
      nextPickup: "3:00 PM",
      currentLocation: "UEL Docklands Campus",
    },
    {
      id: "3",
      name: "Michael Thompson",
      grade: "6",
      photo: "/playful-park-afternoon.png",
      busRoute: "Afternoon Route #215",
      busNumber: "Bus 215",
      status: "at-home",
      nextPickup: "7:30 AM Tomorrow",
      currentLocation: "Home",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-bus":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "at-school":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "at-home":
        return <CheckCircle className="h-4 w-4 text-purple-500" />
      case "absent":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-bus":
        return "On Bus"
      case "at-school":
        return "At School"
      case "at-home":
        return "At Home"
      case "absent":
        return "Absent"
      default:
        return "Unknown"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-bus":
        return "bg-blue-500"
      case "at-school":
        return "bg-green-500"
      case "at-home":
        return "bg-purple-500"
      case "absent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Children</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-blue-400 to-blue-600">
              <div className="absolute -bottom-10 left-4">
                <div className="relative w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                  <Image src={child.photo || "/placeholder.svg"} alt={child.name} fill className="object-cover" />
                </div>
              </div>
            </div>
            <CardContent className="pt-12 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{child.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grade {child.grade}</p>
                </div>
                <Badge className={getStatusColor(child.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(child.status)}
                    {getStatusText(child.status)}
                  </span>
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">{child.busNumber}</Badge>
                  <span className="text-gray-600 dark:text-gray-400">{child.busRoute}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{child.currentLocation}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {child.status === "at-school" || child.status === "at-home"
                      ? `Next pickup: ${child.nextPickup}`
                      : `Next dropoff: ${child.nextDropoff}`}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

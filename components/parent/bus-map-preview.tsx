"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, AlertTriangle, Maximize2 } from "lucide-react"
import MapComponent from "@/components/map-component"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { RouteResult } from "@/components/open-route-service"

interface BusLocation {
  id: string
  busNumber: string
  routeName: string
  latitude: number
  longitude: number
  status: "on-time" | "delayed" | "stopped"
  lastUpdated: string
  nextStop: string
  estimatedArrival: string
  delayMinutes?: number
}

export function BusMapPreview() {
  const [busLocations, setBusLocations] = useState<BusLocation[]>([
    {
      id: "1",
      busNumber: "103",
      routeName: "Morning Route #103",
      latitude: 51.5645,
      longitude: 0.1635,
      status: "on-time",
      lastUpdated: "2 min ago",
      nextStop: "Becontree Heath",
      estimatedArrival: "8:30 AM",
    },
    {
      id: "2",
      busNumber: "215",
      routeName: "Afternoon Route #215",
      latitude: 51.5074,
      longitude: 0.0653,
      status: "delayed",
      lastUpdated: "1 min ago",
      nextStop: "UEL Docklands Campus",
      estimatedArrival: "3:20 PM",
      delayMinutes: 5,
    },
  ])

  const [selectedBus, setSelectedBus] = useState<string | null>("1")
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [fullscreenMap, setFullscreenMap] = useState(false)

  // Create a mock route result for the map component
  const mockRouteResult: RouteResult = {
    geometry: {
      coordinates: [
        [0.1635, 51.5645], // RM10 9QB (Dagenham)
        [0.155, 51.561], // Heathway
        [0.145, 51.558], // Rainham Road
        [0.13, 51.552], // A13 Junction
        [0.11, 51.54], // A13 Newham Way
        [0.09, 51.525], // Royal Docks Road
        [0.075, 51.515], // Gallions Roundabout
        [0.0653, 51.5074], // E16 2RD (UEL Docklands Campus)
      ],
    },
    properties: {
      segments: [
        {
          distance: 800,
          duration: 120,
          instruction: "Drive south on Heathway toward Dagenham Heathway Station",
          name: "Heathway",
          type: "depart",
          way_points: [0, 1],
        },
        {
          distance: 1200,
          duration: 180,
          instruction: "Continue southwest onto Rainham Road",
          name: "Rainham Road",
          type: "continue",
          way_points: [1, 2],
        },
        {
          distance: 2500,
          duration: 300,
          instruction: "Turn right onto A13 (Newham Way) heading west",
          name: "A13",
          type: "turn-right",
          way_points: [2, 3],
        },
        {
          distance: 3500,
          duration: 420,
          instruction: "Continue on A13 through Newham",
          name: "A13 Newham Way",
          type: "continue",
          way_points: [3, 4],
        },
        {
          distance: 2000,
          duration: 240,
          instruction: "Take the exit toward Royal Docks/ExCeL London",
          name: "Royal Docks Road",
          type: "turn-left",
          way_points: [4, 5],
        },
        {
          distance: 800,
          duration: 120,
          instruction: "At Gallions Roundabout, take the 2nd exit onto University Way",
          name: "Gallions Roundabout",
          type: "roundabout",
          way_points: [5, 6],
        },
        {
          distance: 400,
          duration: 60,
          instruction: "Arrive at University of East London Docklands Campus",
          name: "University Way",
          type: "arrive",
          way_points: [6, 7],
        },
      ],
      summary: {
        distance: 11200,
        duration: 1440,
      },
      way_points: [0, 7],
    },
  }

  // In a real app, you would fetch bus locations from an API
  useEffect(() => {
    // Simulate bus movement by updating locations every few seconds
    const interval = setInterval(() => {
      setBusLocations((prev) =>
        prev.map((bus) => {
          // Find the bus's position along the route
          const selectedBusData = prev.find((b) => b.id === selectedBus)
          const routeIndex =
            selectedBusData?.id === "1"
              ? Math.floor(Math.random() * 4)
              : // First bus is somewhere in the first half of the route
                4 + Math.floor(Math.random() * 3) // Second bus is somewhere in the second half

          // Get coordinates from the route
          const coordinates = mockRouteResult.geometry.coordinates[routeIndex]

          return {
            ...bus,
            // Add small random movement to make it look more realistic
            latitude: bus.id === selectedBus ? coordinates[1] + (Math.random() * 0.001 - 0.0005) : bus.latitude,
            longitude: bus.id === selectedBus ? coordinates[0] + (Math.random() * 0.001 - 0.0005) : bus.longitude,
            lastUpdated: "Just now",
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedBus])

  // Update bus markers on the map when bus locations change
  useEffect(() => {
    if (!mapInstance) return

    try {
      // Clear existing bus markers
      const existingMarkers = document.querySelectorAll(".bus-marker")
      existingMarkers.forEach((marker) => marker.remove())

      // Add bus markers to the map
      busLocations.forEach((bus) => {
        if (!window.L) return

        // Create custom bus icon
        const busIcon = window.L.divIcon({
          html: `<div class="bus-marker w-6 h-6 rounded-full ${
            bus.status === "on-time" ? "bg-green-500" : bus.status === "delayed" ? "bg-amber-500" : "bg-red-500"
          } border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">
            ${bus.busNumber}
          </div>`,
          className: "custom-div-icon",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        // Add marker to map
        const marker = window.L.marker([bus.latitude, bus.longitude], { icon: busIcon })
          .addTo(mapInstance)
          .bindPopup(`
            <strong>Bus #${bus.busNumber}</strong><br>
            Route: ${bus.routeName}<br>
            Status: ${
              bus.status === "on-time"
                ? "On Time"
                : bus.status === "delayed"
                  ? `Delayed (${bus.delayMinutes} min)`
                  : "Stopped"
            }<br>
            Next Stop: ${bus.nextStop}<br>
            ETA: ${bus.estimatedArrival}
          `)

        // Open popup for selected bus
        if (bus.id === selectedBus) {
          marker.openPopup()
        }
      })

      // Center map on selected bus
      const selectedBusData = busLocations.find((bus) => bus.id === selectedBus)
      if (selectedBusData) {
        mapInstance.setView([selectedBusData.latitude, selectedBusData.longitude], 13)
      }
    } catch (error) {
      console.error("Error updating bus markers:", error)
    }
  }, [busLocations, mapInstance, selectedBus])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-green-500">On Time</Badge>
      case "delayed":
        return <Badge className="bg-amber-500">Delayed</Badge>
      case "stopped":
        return <Badge className="bg-red-500">Stopped</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const selectedBusData = busLocations.find((bus) => bus.id === selectedBus) || busLocations[0]

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Live Bus Tracking</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[90vw]">
              <DialogHeader>
                <DialogTitle>Live Bus Tracking</DialogTitle>
              </DialogHeader>
              <div className="h-[70vh]">
                <MapComponent routeData={mockRouteResult} setMapInstance={setMapInstance} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {busLocations.map((bus) => (
              <Button
                key={bus.id}
                variant={selectedBus === bus.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBus(bus.id)}
                className="flex items-center gap-1"
              >
                Bus {bus.busNumber}
                <span
                  className={`w-2 h-2 rounded-full ${
                    bus.status === "on-time" ? "bg-green-500" : bus.status === "delayed" ? "bg-amber-500" : "bg-red-500"
                  }`}
                ></span>
              </Button>
            ))}
          </div>

          <div className="relative w-full h-[200px] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <MapComponent routeData={mockRouteResult} setMapInstance={setMapInstance} />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{selectedBusData.routeName}</h3>
              {getStatusBadge(selectedBusData.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Next: {selectedBusData.nextStop}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">ETA: {selectedBusData.estimatedArrival}</span>
              </div>
            </div>

            {selectedBusData.status === "delayed" && (
              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Delayed by {selectedBusData.delayMinutes} minutes</span>
              </div>
            )}

            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Full Map
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

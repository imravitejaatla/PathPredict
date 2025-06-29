"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

// Dynamically import the Map component with no SSR and a unique key
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-100 flex items-center justify-center rounded-lg">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
        <p className="text-slate-500">Loading map...</p>
      </div>
    </div>
  ),
})

export default function MapExample() {
  const [mapInstance, setMapInstance] = useState<any>(null)

  // Example locations
  const locations = [
    { name: "London Bridge", coords: [51.508, -0.087] },
    { name: "Tower of London", coords: [51.508, -0.076] },
    { name: "Big Ben", coords: [51.501, -0.124] },
    { name: "Buckingham Palace", coords: [51.501, -0.142] },
  ]

  // Function to fly to a location
  const flyToLocation = (coords: [number, number]) => {
    if (mapInstance) {
      mapInstance.flyTo(coords, 15, {
        duration: 2,
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Leaflet Map Example</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full">
                <MapComponent setMapInstance={setMapInstance} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>London Landmarks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {locations.map((location, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => flyToLocation(location.coords)}
                  >
                    {location.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

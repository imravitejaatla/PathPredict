"use client"

import { useEffect, useRef, useState } from "react"
import type { RouteResult } from "./open-route-service"
import { formatDistance } from "./open-route-service"

interface MapComponentProps {
  routeData?: RouteResult
  setMapInstance?: (map: any) => void
}

export default function MapComponent({ routeData, setMapInstance }: MapComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<any>(null)
  const routeLayerRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Initialize map when component mounts
  useEffect(() => {
    // Skip server-side rendering
    if (typeof window === "undefined") return

    const map: any = null
    const cleanup: (() => void) | null = null

    const initializeMap = async () => {
      try {
        setIsLoading(true)

        // Load Leaflet dynamically
        if (!window.L) {
          // Add CSS
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)

          // Load script
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script")
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            script.onload = () => resolve()
            script.onerror = () => reject(new Error("Failed to load Leaflet"))
            document.head.appendChild(script)
          })
        }

        // Check if Leaflet loaded correctly
        if (!window.L) {
          throw new Error("Leaflet failed to initialize")
        }

        // Initialize map if container exists
        if (containerRef.current && !mapRef.current) {
          // Create map instance
          const map = window.L.map(containerRef.current).setView([51.505, -0.09], 13)

          // Add tile layer
          window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map)

          // Add sample markers
          const busIcon = window.L.divIcon({
            html: `<div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">B</div>`,
            className: "custom-div-icon",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          window.L.marker([51.51, -0.1], { icon: busIcon }).addTo(map).bindPopup("Bus #103: On Time")
          window.L.marker([51.505, -0.09], { icon: busIcon }).addTo(map).bindPopup("Bus #215: 5 min delay")
          window.L.marker([51.49, -0.08], { icon: busIcon }).addTo(map).bindPopup("Bus #087: On Time")

          // Store map reference
          mapRef.current = map

          // Notify parent component
          if (setMapInstance) {
            setMapInstance(map)
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Map initialization error:", err)
        setError("Failed to load map. Please refresh the page.")
        setIsLoading(false)
      }
    }

    initializeMap()

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [setMapInstance])

  // Update map when route data changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.L || !mapRef.current || !routeData) return

    try {
      const map = mapRef.current
      const L = window.L

      // Clear existing routes and markers
      if (routeLayerRef.current) {
        if (Array.isArray(routeLayerRef.current)) {
          routeLayerRef.current.forEach((layer) => {
            if (layer) map.removeLayer(layer)
          })
        } else {
          map.removeLayer(routeLayerRef.current)
        }
        routeLayerRef.current = null
      }

      markersRef.current.forEach((marker) => {
        if (marker) map.removeLayer(marker)
      })
      markersRef.current = []

      // Validate route data
      if (!routeData.geometry || !routeData.geometry.coordinates || routeData.geometry.coordinates.length === 0) {
        console.error("Invalid route data structure:", routeData)
        return
      }

      // Convert coordinates from [lng, lat] to [lat, lng] for Leaflet
      const points = routeData.geometry.coordinates
        .map((coord) => {
          if (!Array.isArray(coord) || coord.length < 2) return null
          return [coord[1], coord[0]]
        })
        .filter((point) => point !== null)

      if (points.length === 0) {
        console.error("No valid points found in route data")
        return
      }

      // Create a polyline for the route
      const routeLine = L.polyline(points, {
        color: "#3388ff",
        weight: 6,
        opacity: 0.8,
        lineJoin: "round",
        lineCap: "round",
      }).addTo(map)

      routeLayerRef.current = routeLine

      // Add start and end markers
      if (points.length > 0) {
        const startPoint = points[0]
        const endPoint = points[points.length - 1]

        // Create custom icons for start and end points
        const startIcon = L.divIcon({
          html: `<div class="w-6 h-6 rounded-full bg-green-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">A</div>`,
          className: "custom-div-icon",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        const endIcon = L.divIcon({
          html: `<div class="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-md flex items-center justify-center text-white text-xs font-bold">B</div>`,
          className: "custom-div-icon",
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        // Create start marker with popup
        const startMarker = L.marker(startPoint, { icon: startIcon }).addTo(map)
        markersRef.current.push(startMarker)

        let startPopupContent = "<strong>Start Location</strong>"
        if (routeData.properties && routeData.properties.segments && routeData.properties.segments.length > 0) {
          startPopupContent += `<br>${routeData.properties.segments[0].instruction}`
        }
        startMarker.bindPopup(startPopupContent).openPopup()

        // Create end marker with popup
        const endMarker = L.marker(endPoint, { icon: endIcon }).addTo(map)
        markersRef.current.push(endMarker)

        let endPopupContent = "<strong>Destination</strong>"
        if (routeData.properties && routeData.properties.segments && routeData.properties.segments.length > 1) {
          const lastSegment = routeData.properties.segments[routeData.properties.segments.length - 1]
          endPopupContent += `<br>${lastSegment.instruction}`
        }
        endMarker.bindPopup(endPopupContent)

        // Add waypoint markers for turns
        if (routeData.properties && routeData.properties.segments && routeData.properties.segments.length > 2) {
          for (let i = 1; i < routeData.properties.segments.length - 1; i++) {
            const segment = routeData.properties.segments[i]
            if (segment.way_points && segment.way_points.length === 2) {
              const waypointIndex = segment.way_points[0]
              if (waypointIndex >= 0 && waypointIndex < points.length) {
                const waypointCoord = points[waypointIndex]

                // Create a smaller marker for waypoints
                const waypointIcon = L.divIcon({
                  html: `<div class="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>`,
                  className: "custom-div-icon",
                  iconSize: [12, 12],
                  iconAnchor: [6, 6],
                })

                const waypointMarker = L.marker(waypointCoord, { icon: waypointIcon })
                  .addTo(map)
                  .bindPopup(
                    `<strong>Turn</strong><br>${segment.instruction}<br>Distance: ${formatDistance(segment.distance)}`,
                  )

                markersRef.current.push(waypointMarker)
              }
            }
          }
        }

        // Fit the map to the route bounds
        try {
          const bounds = routeLine.getBounds()
          if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] })
          }
        } catch (boundsError) {
          console.warn("Error fitting map to bounds:", boundsError)
          map.setView(startPoint, 13)
        }
      }
    } catch (error) {
      console.error("Error updating map with route:", error)
    }
  }, [routeData])

  // Error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-blue-600 font-medium">Loading map...</p>
          </div>
        </div>
      )}
      <div className="w-full h-full z-0" id="map-container" ref={containerRef}></div>
    </div>
  )
}

// TypeScript declarations
declare global {
  interface Window {
    L: any
  }
  interface HTMLDivElement {
    _leaflet_id?: number
  }
}

"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"

interface RoutePlanningProps {
  onBack: () => void
}

// Sample data
const ROUTES = [
  {
    id: "R001",
    name: "Morning Route #103",
    description: "Dagenham to UEL Docklands Campus",
    stops: 4,
    distance: "11.2 km",
    duration: "25 min",
    assignedBus: "Bus #103",
    schedule: "Weekdays, 7:30 AM",
  },
  {
    id: "R002",
    name: "Afternoon Route #103",
    description: "UEL Docklands Campus to Dagenham",
    stops: 4,
    distance: "11.2 km",
    duration: "25 min",
    assignedBus: "Bus #103",
    schedule: "Weekdays, 4:15 PM",
  },
  {
    id: "R003",
    name: "Morning Route #215",
    description: "North Station to Main Campus",
    stops: 6,
    distance: "8.5 km",
    duration: "20 min",
    assignedBus: "Bus #215",
    schedule: "Weekdays, 7:45 AM",
  },
  {
    id: "R004",
    name: "Afternoon Route #215",
    description: "Main Campus to North Station",
    stops: 6,
    distance: "8.5 km",
    duration: "20 min",
    assignedBus: "Bus #215",
    schedule: "Weekdays, 4:30 PM",
  },
  {
    id: "R005",
    name: "EL1 Transit Route",
    description: "Dagenham to UEL via Barking",
    stops: 8,
    distance: "12.5 km",
    duration: "35 min",
    assignedBus: "Bus #EL1",
    schedule: "Daily, Every 15 min",
  },
]

const STOPS = [
  {
    id: "S001",
    name: "Dagenham Heathway",
    address: "Heathway, Dagenham RM10 9QB",
    routes: ["Morning Route #103", "EL1 Transit Route"],
    coordinates: "51.5645, 0.1635",
  },
  {
    id: "S002",
    name: "Becontree Heath",
    address: "Becontree Heath, Dagenham",
    routes: ["Morning Route #103", "EL1 Transit Route"],
    coordinates: "51.558, 0.145",
  },
  {
    id: "S003",
    name: "Barking Station",
    address: "Station Parade, Barking",
    routes: ["EL1 Transit Route"],
    coordinates: "51.539, 0.081",
  },
  {
    id: "S004",
    name: "East Ham",
    address: "High Street North, East Ham",
    routes: ["EL1 Transit Route"],
    coordinates: "51.538, 0.052",
  },
  {
    id: "S005",
    name: "Beckton",
    address: "Beckton, London",
    routes: ["EL1 Transit Route"],
    coordinates: "51.514, 0.055",
  },
  {
    id: "S006",
    name: "Cyprus DLR",
    address: "Cyprus DLR Station, London",
    routes: ["EL1 Transit Route"],
    coordinates: "51.509, 0.064",
  },
  {
    id: "S007",
    name: "UEL Docklands Campus",
    address: "University Way, London E16 2RD",
    routes: ["Morning Route #103", "EL1 Transit Route"],
    coordinates: "51.5074, 0.0653",
  },
  {
    id: "S008",
    name: "North Station",
    address: "North Station Road",
    routes: ["Morning Route #215"],
    coordinates: "51.532, -0.123",
  },
]

export function RoutePlanning({ onBack }: RoutePlanningProps) {
  const [routes, setRoutes] = useState(ROUTES)
  const [stops, setStops] = useState(STOPS)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)
  const [isAddStopOpen, setIsAddStopOpen] = useState(false)
  const [newRoute, setNewRoute] = useState({
    name: "",
    description: "",
    stops: "",
    distance: "",
    duration: "",
    assignedBus: "",
    schedule: "",
  })
  const [newStop, setNewStop] = useState({
    name: "",
    address: "",
    routes: [],
    coordinates: "",
  })

  const handleAddRoute = () => {
    const id = `R${String(routes.length + 1).padStart(3, "0")}`
    setRoutes([...routes, { id, ...newRoute, stops: Number.parseInt(newRoute.stops) }])
    setNewRoute({
      name: "",
      description: "",
      stops: "",
      distance: "",
      duration: "",
      assignedBus: "",
      schedule: "",
    })
    setIsAddRouteOpen(false)
  }

  const handleAddStop = () => {
    const id = `S${String(stops.length + 1).padStart(3, "0")}`
    setStops([...stops, { id, ...newStop }])
    setNewStop({
      name: "",
      address: "",
      routes: [],
      coordinates: "",
    })
    setIsAddStopOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Route Planning</h2>
        </div>
      </div>

      <Tabs defaultValue="routes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="stops">Stops</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Transportation Routes</h3>
            <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Route
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Enter the details for the new route.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-name" className="text-right">
                      Route Name
                    </Label>
                    <Input
                      id="route-name"
                      value={newRoute.name}
                      onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="route-description"
                      value={newRoute.description}
                      onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-stops" className="text-right">
                      Stops
                    </Label>
                    <Input
                      id="route-stops"
                      type="number"
                      value={newRoute.stops}
                      onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-distance" className="text-right">
                      Distance
                    </Label>
                    <Input
                      id="route-distance"
                      value={newRoute.distance}
                      onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. 10.5 km"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-duration" className="text-right">
                      Duration
                    </Label>
                    <Input
                      id="route-duration"
                      value={newRoute.duration}
                      onChange={(e) => setNewRoute({ ...newRoute, duration: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. 25 min"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-bus" className="text-right">
                      Assigned Bus
                    </Label>
                    <Input
                      id="route-bus"
                      value={newRoute.assignedBus}
                      onChange={(e) => setNewRoute({ ...newRoute, assignedBus: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route-schedule" className="text-right">
                      Schedule
                    </Label>
                    <Input
                      id="route-schedule"
                      value={newRoute.schedule}
                      onChange={(e) => setNewRoute({ ...newRoute, schedule: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. Weekdays, 7:30 AM"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddRoute}>
                    Add Route
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left font-medium">Route ID</th>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Description</th>
                  <th className="p-3 text-left font-medium">Stops</th>
                  <th className="p-3 text-left font-medium">Distance</th>
                  <th className="p-3 text-left font-medium">Duration</th>
                  <th className="p-3 text-left font-medium">Bus</th>
                  <th className="p-3 text-left font-medium">Schedule</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id} className="border-b">
                    <td className="p-3">{route.id}</td>
                    <td className="p-3">{route.name}</td>
                    <td className="p-3">{route.description}</td>
                    <td className="p-3">{route.stops}</td>
                    <td className="p-3">{route.distance}</td>
                    <td className="p-3">{route.duration}</td>
                    <td className="p-3">{route.assignedBus}</td>
                    <td className="p-3">{route.schedule}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="stops" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Bus Stops</h3>
            <Dialog open={isAddStopOpen} onOpenChange={setIsAddStopOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Stop
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Stop</DialogTitle>
                  <DialogDescription>Enter the details for the new bus stop.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stop-name" className="text-right">
                      Stop Name
                    </Label>
                    <Input
                      id="stop-name"
                      value={newStop.name}
                      onChange={(e) => setNewStop({ ...newStop, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stop-address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="stop-address"
                      value={newStop.address}
                      onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stop-coordinates" className="text-right">
                      Coordinates
                    </Label>
                    <Input
                      id="stop-coordinates"
                      value={newStop.coordinates}
                      onChange={(e) => setNewStop({ ...newStop, coordinates: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. 51.5074, 0.0653"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStop}>
                    Add Stop
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left font-medium">Stop ID</th>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Address</th>
                  <th className="p-3 text-left font-medium">Routes</th>
                  <th className="p-3 text-left font-medium">Coordinates</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stops.map((stop) => (
                  <tr key={stop.id} className="border-b">
                    <td className="p-3">{stop.id}</td>
                    <td className="p-3">{stop.name}</td>
                    <td className="p-3">{stop.address}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {stop.routes.map((route) => (
                          <Badge key={route} variant="outline" className="text-xs">
                            {route}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">{stop.coordinates}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

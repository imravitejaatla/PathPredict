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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface FleetManagementProps {
  onBack: () => void
}

// Sample data
const BUSES = [
  { id: "B001", name: "Bus #103", type: "School Bus", capacity: 42, status: "Active", lastMaintenance: "2025-03-15" },
  { id: "B002", name: "Bus #215", type: "School Bus", capacity: 48, status: "Active", lastMaintenance: "2025-04-02" },
  { id: "B003", name: "Bus #087", type: "Minibus", capacity: 24, status: "Maintenance", lastMaintenance: "2025-04-10" },
  { id: "B004", name: "Bus #156", type: "School Bus", capacity: 42, status: "Active", lastMaintenance: "2025-03-28" },
  { id: "B005", name: "Bus #EL1", type: "Transit Bus", capacity: 60, status: "Active", lastMaintenance: "2025-04-05" },
]

const DRIVERS = [
  { id: "D001", name: "John Smith", license: "PSV-12345", status: "On Duty", assignedBus: "Bus #103" },
  { id: "D002", name: "Sarah Johnson", license: "PSV-23456", status: "On Duty", assignedBus: "Bus #215" },
  { id: "D003", name: "Michael Brown", license: "PSV-34567", status: "Off Duty", assignedBus: "Bus #087" },
  { id: "D004", name: "Emily Davis", license: "PSV-45678", status: "On Duty", assignedBus: "Bus #156" },
  { id: "D005", name: "Robert Wilson", license: "PSV-56789", status: "On Leave", assignedBus: "Unassigned" },
]

const MAINTENANCE = [
  {
    id: "M001",
    busId: "B003",
    busName: "Bus #087",
    type: "Routine Service",
    date: "2025-04-10",
    status: "In Progress",
    notes: "Regular 10,000 mile service",
  },
  {
    id: "M002",
    busId: "B001",
    busName: "Bus #103",
    type: "Oil Change",
    date: "2025-03-15",
    status: "Completed",
    notes: "Oil and filter replacement",
  },
  {
    id: "M003",
    busId: "B002",
    busName: "Bus #215",
    type: "Brake Inspection",
    date: "2025-04-02",
    status: "Completed",
    notes: "Brake pads replaced on rear wheels",
  },
  {
    id: "M004",
    busId: "B004",
    busName: "Bus #156",
    type: "Tire Replacement",
    date: "2025-03-28",
    status: "Completed",
    notes: "All tires replaced",
  },
  {
    id: "M005",
    busId: "B005",
    busName: "Bus #EL1",
    type: "Routine Service",
    date: "2025-04-05",
    status: "Completed",
    notes: "Regular 5,000 mile service",
  },
]

export function FleetManagement({ onBack }: FleetManagementProps) {
  const [buses, setBuses] = useState(BUSES)
  const [drivers, setDrivers] = useState(DRIVERS)
  const [maintenance, setMaintenance] = useState(MAINTENANCE)
  const [isAddBusOpen, setIsAddBusOpen] = useState(false)
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)
  const [isAddMaintenanceOpen, setIsAddMaintenanceOpen] = useState(false)
  const [newBus, setNewBus] = useState({ name: "", type: "", capacity: "", status: "Active" })
  const [newDriver, setNewDriver] = useState({ name: "", license: "", status: "Off Duty", assignedBus: "" })
  const [newMaintenance, setNewMaintenance] = useState({
    busId: "",
    type: "",
    date: "",
    status: "Scheduled",
    notes: "",
  })

  const handleAddBus = () => {
    const id = `B${String(buses.length + 1).padStart(3, "0")}`
    setBuses([...buses, { id, ...newBus, capacity: Number.parseInt(newBus.capacity), lastMaintenance: "N/A" }])
    setNewBus({ name: "", type: "", capacity: "", status: "Active" })
    setIsAddBusOpen(false)
  }

  const handleAddDriver = () => {
    const id = `D${String(drivers.length + 1).padStart(3, "0")}`
    setDrivers([...drivers, { id, ...newDriver }])
    setNewDriver({ name: "", license: "", status: "Off Duty", assignedBus: "" })
    setIsAddDriverOpen(false)
  }

  const handleAddMaintenance = () => {
    const id = `M${String(maintenance.length + 1).padStart(3, "0")}`
    const bus = buses.find((b) => b.id === newMaintenance.busId)
    setMaintenance([
      ...maintenance,
      {
        id,
        ...newMaintenance,
        busName: bus?.name || "Unknown",
      },
    ])
    setNewMaintenance({
      busId: "",
      type: "",
      date: "",
      status: "Scheduled",
      notes: "",
    })
    setIsAddMaintenanceOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Fleet Management</h2>
        </div>
      </div>

      <Tabs defaultValue="buses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buses">Buses</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="buses" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Bus Fleet</h3>
            <Dialog open={isAddBusOpen} onOpenChange={setIsAddBusOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Bus
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Bus</DialogTitle>
                  <DialogDescription>Enter the details for the new bus.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bus-name" className="text-right">
                      Bus Number
                    </Label>
                    <Input
                      id="bus-name"
                      value={newBus.name}
                      onChange={(e) => setNewBus({ ...newBus, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bus-type" className="text-right">
                      Type
                    </Label>
                    <Select value={newBus.type} onValueChange={(value) => setNewBus({ ...newBus, type: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select bus type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="School Bus">School Bus</SelectItem>
                        <SelectItem value="Minibus">Minibus</SelectItem>
                        <SelectItem value="Transit Bus">Transit Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bus-capacity" className="text-right">
                      Capacity
                    </Label>
                    <Input
                      id="bus-capacity"
                      type="number"
                      value={newBus.capacity}
                      onChange={(e) => setNewBus({ ...newBus, capacity: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bus-status" className="text-right">
                      Status
                    </Label>
                    <Select value={newBus.status} onValueChange={(value) => setNewBus({ ...newBus, status: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Out of Service">Out of Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddBus}>
                    Add Bus
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left font-medium">Bus ID</th>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Capacity</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Last Maintenance</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id} className="border-b">
                    <td className="p-3">{bus.id}</td>
                    <td className="p-3">{bus.name}</td>
                    <td className="p-3">{bus.type}</td>
                    <td className="p-3">{bus.capacity}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          bus.status === "Active" ? "success" : bus.status === "Maintenance" ? "warning" : "destructive"
                        }
                      >
                        {bus.status}
                      </Badge>
                    </td>
                    <td className="p-3">{bus.lastMaintenance}</td>
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

        <TabsContent value="drivers" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Drivers</h3>
            <Dialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                  <DialogDescription>Enter the details for the new driver.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="driver-name"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-license" className="text-right">
                      License
                    </Label>
                    <Input
                      id="driver-license"
                      value={newDriver.license}
                      onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newDriver.status}
                      onValueChange={(value) => setNewDriver({ ...newDriver, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On Duty">On Duty</SelectItem>
                        <SelectItem value="Off Duty">Off Duty</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-bus" className="text-right">
                      Assigned Bus
                    </Label>
                    <Select
                      value={newDriver.assignedBus}
                      onValueChange={(value) => setNewDriver({ ...newDriver, assignedBus: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select bus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unassigned">Unassigned</SelectItem>
                        {buses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.name}>
                            {bus.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddDriver}>
                    Add Driver
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left font-medium">Driver ID</th>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">License</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Assigned Bus</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id} className="border-b">
                    <td className="p-3">{driver.id}</td>
                    <td className="p-3">{driver.name}</td>
                    <td className="p-3">{driver.license}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          driver.status === "On Duty"
                            ? "success"
                            : driver.status === "Off Duty"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {driver.status}
                      </Badge>
                    </td>
                    <td className="p-3">{driver.assignedBus}</td>
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

        <TabsContent value="maintenance" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Maintenance Schedule</h3>
            <Dialog open={isAddMaintenanceOpen} onOpenChange={setIsAddMaintenanceOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule Maintenance
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Maintenance</DialogTitle>
                  <DialogDescription>Enter the maintenance details.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maintenance-bus" className="text-right">
                      Bus
                    </Label>
                    <Select
                      value={newMaintenance.busId}
                      onValueChange={(value) => setNewMaintenance({ ...newMaintenance, busId: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {buses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maintenance-type" className="text-right">
                      Type
                    </Label>
                    <Select
                      value={newMaintenance.type}
                      onValueChange={(value) => setNewMaintenance({ ...newMaintenance, type: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Routine Service">Routine Service</SelectItem>
                        <SelectItem value="Oil Change">Oil Change</SelectItem>
                        <SelectItem value="Brake Inspection">Brake Inspection</SelectItem>
                        <SelectItem value="Tire Replacement">Tire Replacement</SelectItem>
                        <SelectItem value="Engine Repair">Engine Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maintenance-date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="maintenance-date"
                      type="date"
                      value={newMaintenance.date}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, date: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maintenance-status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newMaintenance.status}
                      onValueChange={(value) => setNewMaintenance({ ...newMaintenance, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maintenance-notes" className="text-right">
                      Notes
                    </Label>
                    <Input
                      id="maintenance-notes"
                      value={newMaintenance.notes}
                      onChange={(e) => setNewMaintenance({ ...newMaintenance, notes: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddMaintenance}>
                    Schedule
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left font-medium">ID</th>
                  <th className="p-3 text-left font-medium">Bus</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Date</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Notes</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {maintenance.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">{item.busName}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.date}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          item.status === "Completed"
                            ? "success"
                            : item.status === "In Progress"
                              ? "warning"
                              : "default"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3">{item.notes}</td>
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

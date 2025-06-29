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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface UserManagementProps {
  onBack: () => void
}

// Sample data
const DRIVERS = [
  {
    id: "D001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "020-1234-5678",
    role: "Driver",
    status: "Active",
    assignedBus: "Bus #103",
  },
  {
    id: "D002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "020-2345-6789",
    role: "Driver",
    status: "Active",
    assignedBus: "Bus #215",
  },
  {
    id: "D003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "020-3456-7890",
    role: "Driver",
    status: "Inactive",
    assignedBus: "Bus #087",
  },
  {
    id: "D004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "020-4567-8901",
    role: "Driver",
    status: "Active",
    assignedBus: "Bus #156",
  },
  {
    id: "D005",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    phone: "020-5678-9012",
    role: "Driver",
    status: "On Leave",
    assignedBus: "Unassigned",
  },
]

const PARENTS = [
  {
    id: "P001",
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "020-6789-0123",
    role: "Parent",
    status: "Active",
    children: ["Alex Thompson", "Emma Thompson"],
  },
  {
    id: "P002",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "020-7890-1234",
    role: "Parent",
    status: "Active",
    children: ["Oliver Lee"],
  },
  {
    id: "P003",
    name: "Richard Harris",
    email: "richard.harris@example.com",
    phone: "020-8901-2345",
    role: "Parent",
    status: "Active",
    children: ["Sophia Harris", "William Harris"],
  },
  {
    id: "P004",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "020-9012-3456",
    role: "Parent",
    status: "Active",
    children: ["Isabella Martinez"],
  },
  {
    id: "P005",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "020-0123-4567",
    role: "Parent",
    status: "Inactive",
    children: ["Ethan Wilson"],
  },
]

const STUDENTS = [
  {
    id: "S001",
    name: "Alex Thompson",
    grade: "10",
    parent: "David Thompson",
    route: "Morning Route #103",
    status: "Active",
  },
  {
    id: "S002",
    name: "Emma Thompson",
    grade: "8",
    parent: "David Thompson",
    route: "Morning Route #103",
    status: "Active",
  },
  {
    id: "S003",
    name: "Oliver Lee",
    grade: "9",
    parent: "Jennifer Lee",
    route: "Morning Route #215",
    status: "Active",
  },
  {
    id: "S004",
    name: "Sophia Harris",
    grade: "11",
    parent: "Richard Harris",
    route: "Morning Route #103",
    status: "Active",
  },
  {
    id: "S005",
    name: "William Harris",
    grade: "7",
    parent: "Richard Harris",
    route: "Morning Route #103",
    status: "Active",
  },
  {
    id: "S006",
    name: "Isabella Martinez",
    grade: "10",
    parent: "Lisa Martinez",
    route: "Morning Route #215",
    status: "Active",
  },
  {
    id: "S007",
    name: "Ethan Wilson",
    grade: "8",
    parent: "James Wilson",
    route: "Morning Route #215",
    status: "Inactive",
  },
]

export function UserManagement({ onBack }: UserManagementProps) {
  const [drivers, setDrivers] = useState(DRIVERS)
  const [parents, setParents] = useState(PARENTS)
  const [students, setStudents] = useState(STUDENTS)
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)
  const [isAddParentOpen, setIsAddParentOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [newDriver, setNewDriver] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    assignedBus: "",
  })
  const [newParent, setNewParent] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    children: [],
  })
  const [newStudent, setNewStudent] = useState({
    name: "",
    grade: "",
    parent: "",
    route: "",
    status: "Active",
  })

  const handleAddDriver = () => {
    const id = `D${String(drivers.length + 1).padStart(3, "0")}`
    setDrivers([...drivers, { id, ...newDriver, role: "Driver" }])
    setNewDriver({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      assignedBus: "",
    })
    setIsAddDriverOpen(false)
  }

  const handleAddParent = () => {
    const id = `P${String(parents.length + 1).padStart(3, "0")}`
    setParents([...parents, { id, ...newParent, role: "Parent" }])
    setNewParent({
      name: "",
      email: "",
      phone: "",
      status: "Active",
      children: [],
    })
    setIsAddParentOpen(false)
  }

  const handleAddStudent = () => {
    const id = `S${String(students.length + 1).padStart(3, "0")}`
    setStudents([...students, { id, ...newStudent }])
    setNewStudent({
      name: "",
      grade: "",
      parent: "",
      route: "",
      status: "Active",
    })
    setIsAddStudentOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">User Management</h2>
        </div>
      </div>

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Driver Accounts</h3>
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
                  <DialogDescription>Enter the details for the new driver account.</DialogDescription>
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
                    <Label htmlFor="driver-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="driver-email"
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="driver-phone"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="driver-bus" className="text-right">
                      Assigned Bus
                    </Label>
                    <Input
                      id="driver-bus"
                      value={newDriver.assignedBus}
                      onChange={(e) => setNewDriver({ ...newDriver, assignedBus: e.target.value })}
                      className="col-span-3"
                      placeholder="e.g. Bus #103"
                    />
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
                  <th className="p-3 text-left font-medium">ID</th>
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Email</th>
                  <th className="p-3 text-left font-medium">Phone</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Assigned Bus</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id} className="border-b">
                    <td className="p-3">{driver.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {driver.name}
                      </div>
                    </td>
                    <td className="p-3">{driver.email}</td>
                    <td className="p-3">{driver.phone}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          driver.status === "Active"
                            ? "success"
                            : driver.status === "Inactive"
                              ? "destructive"
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

        <TabsContent value="parents" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Parent Accounts</h3>
            <Dialog open={isAddParentOpen} onOpenChange={setIsAddParentOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Parent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Parent</DialogTitle>
                  <DialogDescription>Enter the details for the new parent account.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="parent-name"
                      value={newParent.name}
                      onChange={(e) => setNewParent({ ...newParent, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="parent-email"
                      type="email"
                      value={newParent.email}
                      onChange={(e) => setNewParent({ ...newParent, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="parent-phone"
                      value={newParent.phone}
                      onChange={(e) => setNewParent({ ...newParent, phone: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="parent-status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newParent.status}
                      onValueChange={(value) => setNewParent({ ...newParent, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddParent}>
                    Add Parent
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
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Email</th>
                  <th className="p-3 text-left font-medium">Phone</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Children</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id} className="border-b">
                    <td className="p-3">{parent.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {parent.name}
                      </div>
                    </td>
                    <td className="p-3">{parent.email}</td>
                    <td className="p-3">{parent.phone}</td>
                    <td className="p-3">
                      <Badge variant={parent.status === "Active" ? "success" : "destructive"}>{parent.status}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {parent.children.map((child) => (
                          <Badge key={child} variant="outline" className="text-xs">
                            {child}
                          </Badge>
                        ))}
                      </div>
                    </td>
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

        <TabsContent value="students" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Student Accounts</h3>
            <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Enter the details for the new student.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="student-name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student-grade" className="text-right">
                      Grade
                    </Label>
                    <Input
                      id="student-grade"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student-parent" className="text-right">
                      Parent
                    </Label>
                    <Select
                      value={newStudent.parent}
                      onValueChange={(value) => setNewStudent({ ...newStudent, parent: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select parent" />
                      </SelectTrigger>
                      <SelectContent>
                        {parents.map((parent) => (
                          <SelectItem key={parent.id} value={parent.name}>
                            {parent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student-route" className="text-right">
                      Route
                    </Label>
                    <Input
                      id="student-route"
                      value={newStudent.route}
                      onChange={(e) => setNewStudent({ ...newStudent, route: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="student-status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newStudent.status}
                      onValueChange={(value) => setNewStudent({ ...newStudent, status: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddStudent}>
                    Add Student
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
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Grade</th>
                  <th className="p-3 text-left font-medium">Parent</th>
                  <th className="p-3 text-left font-medium">Route</th>
                  <th className="p-3 text-left font-medium">Status</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </td>
                    <td className="p-3">{student.grade}</td>
                    <td className="p-3">{student.parent}</td>
                    <td className="p-3">{student.route}</td>
                    <td className="p-3">
                      <Badge variant={student.status === "Active" ? "success" : "destructive"}>{student.status}</Badge>
                    </td>
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

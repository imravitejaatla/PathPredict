"use client"

import { useState } from "react"
import { ArrowLeft, Search, UserCheck, UserX, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StudentCheckInViewProps {
  onBack: () => void
}

export function StudentCheckInView({ onBack }: StudentCheckInViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      grade: "10",
      route: "Morning Route #103",
      status: "present",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 2,
      name: "Emma Thompson",
      grade: "8",
      route: "Morning Route #103",
      status: "present",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 3,
      name: "Oliver Lee",
      grade: "9",
      route: "Morning Route #215",
      status: "present",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 4,
      name: "Sophia Harris",
      grade: "11",
      route: "Morning Route #103",
      status: "present",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 5,
      name: "William Harris",
      grade: "7",
      route: "Morning Route #103",
      status: "absent",
      checkedIn: false,
      checkedOut: false,
    },
    {
      id: 6,
      name: "Isabella Martinez",
      grade: "10",
      route: "Morning Route #215",
      status: "present",
      checkedIn: true,
      checkedOut: false,
    },
    {
      id: 7,
      name: "Ethan Wilson",
      grade: "8",
      route: "Morning Route #215",
      status: "absent",
      checkedIn: false,
      checkedOut: false,
    },
  ])

  // Filter students based on search and route
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRoute = selectedRoute === "all" || student.route === selectedRoute
    return matchesSearch && matchesRoute
  })

  // Toggle student check-in status
  const toggleCheckIn = (id: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            checkedIn: !student.checkedIn,
            status: !student.checkedIn ? "present" : "absent",
          }
        }
        return student
      }),
    )
  }

  // Toggle student check-out status
  const toggleCheckOut = (id: number) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return { ...student, checkedOut: !student.checkedOut }
        }
        return student
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">Student Check-in</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Manage Student Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  <SelectItem value="Morning Route #103">Morning Route #103</SelectItem>
                  <SelectItem value="Morning Route #215">Morning Route #215</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                      <th className="p-3 text-left font-medium">Student</th>
                      <th className="p-3 text-left font-medium">Grade</th>
                      <th className="p-3 text-left font-medium">Route</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Check-in</th>
                      <th className="p-3 text-left font-medium">Check-out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b dark:border-gray-700">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">{student.grade}</td>
                        <td className="p-3">{student.route}</td>
                        <td className="p-3">
                          <Badge variant={student.status === "present" ? "success" : "destructive"}>
                            {student.status === "present" ? "Present" : "Absent"}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            variant={student.checkedIn ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleCheckIn(student.id)}
                            className="flex items-center gap-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            {student.checkedIn ? "Checked In" : "Check In"}
                          </Button>
                        </td>
                        <td className="p-3">
                          <Button
                            variant={student.checkedOut ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleCheckOut(student.id)}
                            className="flex items-center gap-1"
                            disabled={!student.checkedIn}
                          >
                            <UserX className="h-4 w-4" />
                            {student.checkedOut ? "Checked Out" : "Check Out"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300">Attendance history would be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center dark:bg-gray-800">
                <p className="text-gray-600 dark:text-gray-300">Attendance reports would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Dashboard
        </Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}

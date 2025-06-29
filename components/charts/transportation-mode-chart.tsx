"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

// Sample data for transportation mode distribution
const transportationModeData = [
  { name: "School Bus", value: 65, color: "#3b82f6" }, // Blue
  { name: "Public Transit", value: 15, color: "#10b981" }, // Green
  { name: "Parent Drop-off", value: 12, color: "#f59e0b" }, // Amber
  { name: "Walking", value: 5, color: "#ec4899" }, // Pink
  { name: "Cycling", value: 3, color: "#8b5cf6" }, // Purple
]

// Custom tooltip for the pie chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length > 0 && payload[0] !== null && payload[0] !== undefined) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    )
  }
  return null
}

export function TransportationModeChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold">Transportation Mode Distribution</CardTitle>
          <CardDescription>How students get to and from school</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <Pie
                data={transportationModeData || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => (name && percent ? `${name}: ${(percent * 100).toFixed(0)}%` : "")}
                labelLine={false}
              >
                {(transportationModeData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ paddingLeft: "20px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

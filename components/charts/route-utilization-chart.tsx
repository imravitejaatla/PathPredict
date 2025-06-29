"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for route utilization
const routeUtilizationData = [
  {
    route: "Route #103",
    capacity: 42,
    morningUtilization: 90,
    afternoonUtilization: 95,
    averageUtilization: 92.5,
  },
  {
    route: "Route #215",
    capacity: 48,
    morningUtilization: 67,
    afternoonUtilization: 73,
    averageUtilization: 70,
  },
  {
    route: "Route #087",
    capacity: 24,
    morningUtilization: 83,
    afternoonUtilization: 79,
    averageUtilization: 81,
  },
  {
    route: "Route #156",
    capacity: 42,
    morningUtilization: 76,
    afternoonUtilization: 81,
    averageUtilization: 78.5,
  },
  {
    route: "Route #EL1",
    capacity: 60,
    morningUtilization: 75,
    afternoonUtilization: 68,
    averageUtilization: 71.5,
  },
]

export function RouteUtilizationChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold">Route Utilization</CardTitle>
          <CardDescription>Capacity utilization by route (%)</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            morningUtilization: {
              label: "Morning",
              color: "hsl(var(--chart-1))",
            },
            afternoonUtilization: {
              label: "Afternoon",
              color: "hsl(var(--chart-2))",
            },
            averageUtilization: {
              label: "Average",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={routeUtilizationData || []} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="route" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={10}
                domain={[0, 100]}
                label={{
                  value: "Utilization (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="morningUtilization"
                fill="#3b82f6" // Blue color
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="afternoonUtilization"
                fill="#10b981" // Green color
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="averageUtilization"
                fill="#f59e0b" // Amber color
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

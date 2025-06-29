"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ReferenceLine } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the past 30 days
const generateOnTimePerformanceData = () => {
  const data = []
  const now = new Date()

  // Base values with some weekly patterns
  const baseValues = {
    morningPerformance: 94,
    afternoonPerformance: 92,
    target: 90,
  }

  // Generate data for the past 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)

    // Create weekly patterns (slightly worse on Mondays and Fridays)
    const dayOfWeek = date.getDay()
    const isMonday = dayOfWeek === 1
    const isFriday = dayOfWeek === 5

    // Random fluctuation
    const fluctuation = Math.random() * 6 - 3

    // Weather effects (random decreases)
    const weatherEffect = Math.random() > 0.85 ? Math.random() * 10 - 10 : 0

    // Traffic conditions (random decreases)
    const trafficEffect = Math.random() > 0.8 ? Math.random() * 8 - 8 : 0

    // Calculate the day's values
    const morningAdjustment = (isMonday ? -2 : 0) + weatherEffect + fluctuation
    const afternoonAdjustment = (isFriday ? -3 : 0) + trafficEffect + fluctuation

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      morningPerformance: Math.min(100, Math.max(75, baseValues.morningPerformance + morningAdjustment)),
      afternoonPerformance: Math.min(100, Math.max(75, baseValues.afternoonPerformance + afternoonAdjustment)),
      target: baseValues.target,
    })
  }

  return data
}

const data = generateOnTimePerformanceData()

export function OnTimePerformanceChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold">On-Time Performance</CardTitle>
          <CardDescription>Percentage of on-time arrivals and departures</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            morningPerformance: {
              label: "Morning Routes",
              color: "hsl(var(--chart-1))",
            },
            afternoonPerformance: {
              label: "Afternoon Routes",
              color: "hsl(var(--chart-2))",
            },
            target: {
              label: "Target (90%)",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data || []} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} tickFormatter={(value) => value || ""} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickMargin={10}
                domain={[75, 100]}
                label={{ value: "On-Time (%)", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="morningPerformance"
                stroke="#3b82f6" // Blue color
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="afternoonPerformance"
                stroke="#10b981" // Green color
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the past 30 days
const generateDailyRidershipData = () => {
  const data = []
  const now = new Date()

  // Base values with some weekly patterns
  const baseValues = {
    morningRoute: 120,
    afternoonRoute: 115,
    totalRiders: 235,
  }

  // Generate data for the past 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)

    // Create weekly patterns (lower on weekends)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Random fluctuation
    const fluctuation = Math.random() * 20 - 10

    // Special events or holidays (random dips)
    const specialEvent = Math.random() > 0.9 ? 0.5 : 1

    // Weather effects (random increases or decreases)
    const weatherEffect = Math.random() > 0.8 ? (Math.random() > 0.5 ? 0.9 : 1.1) : 1

    // Calculate the day's values
    const morningRiders = Math.round(
      (isWeekend ? baseValues.morningRoute * 0.4 : baseValues.morningRoute) * specialEvent * weatherEffect +
        fluctuation,
    )
    const afternoonRiders = Math.round(
      (isWeekend ? baseValues.afternoonRoute * 0.4 : baseValues.afternoonRoute) * specialEvent * weatherEffect +
        fluctuation,
    )

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      morningRoute: Math.max(0, morningRiders),
      afternoonRoute: Math.max(0, afternoonRiders),
      totalRiders: Math.max(0, morningRiders + afternoonRiders),
    })
  }

  return data
}

const data = generateDailyRidershipData()

export function DailyRidershipChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-base font-semibold">Daily Ridership</CardTitle>
          <CardDescription>Student transportation usage over time</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={{
            morningRoute: {
              label: "Morning Route",
              color: "hsl(var(--chart-1))",
            },
            afternoonRoute: {
              label: "Afternoon Route",
              color: "hsl(var(--chart-2))",
            },
            totalRiders: {
              label: "Total Riders",
              color: "hsl(var(--chart-3))",
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
                domain={[0, "auto"]}
                label={{ value: "Students", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="morningRoute"
                stroke="#3b82f6" // Blue color
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="afternoonRoute"
                stroke="#10b981" // Green color
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="totalRiders"
                stroke="#f59e0b" // Amber color
                strokeWidth={3}
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

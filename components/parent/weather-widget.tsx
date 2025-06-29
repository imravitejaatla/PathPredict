"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react"
import { getWeather, type WeatherData } from "@/services/weather-service"

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather()
        setWeather(data)
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case "sun":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloud-sun":
        return <CloudSun className="h-8 w-8 text-blue-400" />
      case "cloud":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "cloud-drizzle":
        return <CloudDrizzle className="h-8 w-8 text-blue-400" />
      case "cloud-rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "cloud-lightning":
        return <CloudLightning className="h-8 w-8 text-purple-500" />
      case "cloud-snow":
        return <CloudSnow className="h-8 w-8 text-blue-300" />
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-500 dark:text-gray-400">Loading weather...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-center h-24">
            <p className="text-gray-500 dark:text-gray-400">Weather data unavailable</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Current Weather</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{weather.location}</p>
          </div>
          {getWeatherIcon(weather.icon)}
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <span className="text-3xl font-bold">{weather.temperature}°C</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{weather.condition}</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <span className="text-gray-600 dark:text-gray-400">Feels: {weather.feelsLike}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-gray-600 dark:text-gray-400">Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">Wind: {weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

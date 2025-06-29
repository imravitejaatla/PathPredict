// Weather service using OpenWeatherMap API
export interface WeatherData {
  condition: string
  temperature: number
  icon: string
  location: string
  feelsLike: number
  humidity: number
  windSpeed: number
}

export async function getWeather(location = "London"): Promise<WeatherData> {
  // In a real app, you would use an API key and fetch from OpenWeatherMap
  // For demo purposes, we'll return mock data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Generate somewhat random but realistic weather data
  const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Rainy", "Thunderstorm", "Snowy"]
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

  const baseTemp = 15 // Base temperature in Celsius
  const randomVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10 variation
  const temperature = baseTemp + randomVariation

  const icons: Record<string, string> = {
    Sunny: "sun",
    "Partly Cloudy": "cloud-sun",
    Cloudy: "cloud",
    "Light Rain": "cloud-drizzle",
    Rainy: "cloud-rain",
    Thunderstorm: "cloud-lightning",
    Snowy: "cloud-snow",
  }

  return {
    condition: randomCondition,
    temperature: temperature,
    icon: icons[randomCondition] || "cloud",
    location: location,
    feelsLike: temperature - 2 + Math.floor(Math.random() * 4),
    humidity: 40 + Math.floor(Math.random() * 40),
    windSpeed: 5 + Math.floor(Math.random() * 20),
  }
}

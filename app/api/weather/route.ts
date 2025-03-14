import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from an actual weather API
  // For now, we'll return mock data
  const weatherData = {
    current: {
      temperature: 72,
      condition: "Sunny with light clouds",
      location: "San Francisco, CA",
      timestamp: "Tuesday, 10:30 AM",
      icon: "sun",
    },
    forecast: [
      { day: "Wed", temp: 70, condition: "Sunny", icon: "sun" },
      { day: "Thu", temp: 68, condition: "Rain", icon: "cloud-rain" },
      { day: "Fri", temp: 65, condition: "Showers", icon: "cloud-rain" },
      { day: "Sat", temp: 72, condition: "Cloudy", icon: "cloud" },
      { day: "Sun", temp: 75, condition: "Sunny", icon: "sun" },
    ],
    details: {
      wind: "8 mph",
      precipitation: "10%",
      uvIndex: "Moderate",
    },
  }

  return NextResponse.json(weatherData)
}


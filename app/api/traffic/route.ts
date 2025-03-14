import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from an actual traffic API
  // For now, we'll return mock data
  const trafficData = {
    overall: {
      condition: "Moderate",
      change: 12, // Percentage increase
    },
    map: {
      location: "Downtown",
      imageUrl: "/placeholder.svg?height=200&width=300", // In a real app, this would be an actual map image
    },
    routes: [
      { name: "Highway 101", color: "primary", duration: "32 min" },
      { name: "Interstate 280", color: "secondary", duration: "45 min" },
      { name: "Market Street", color: "accent", duration: "18 min" },
    ],
  }

  return NextResponse.json(trafficData)
}


import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from an actual flight API
  // For now, we'll return mock data
  const flightData = {
    airport: "SFO International Airport",
    departures: [
      { flight: "UA 954", destination: "New York (JFK)", time: "11:30 AM", status: "On Time", gate: "B12" },
      { flight: "DL 1288", destination: "Atlanta (ATL)", time: "12:45 PM", status: "Delayed", gate: "C5" },
      { flight: "AA 621", destination: "Chicago (ORD)", time: "1:15 PM", status: "On Time", gate: "A8" },
      { flight: "SW 338", destination: "Los Angeles (LAX)", time: "2:00 PM", status: "Boarding", gate: "D3" },
      { flight: "JB 502", destination: "Boston (BOS)", time: "3:30 PM", status: "On Time", gate: "B22" },
    ],
    nextUpdate: "5 minutes",
  }

  return NextResponse.json(flightData)
}


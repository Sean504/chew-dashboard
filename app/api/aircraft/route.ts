import { NextResponse } from "next/server"

export async function GET() {
  // In a real application, you would fetch this data from an actual aircraft API
  // For now, we'll return mock data
  const aircraftData = {
    airport: "SFO International Airport",
    aircraft: [
      {
        aircraft: "Boeing 737-800",
        registration: "N12345",
        airline: "United Airlines",
        status: "In Service",
        gate: "B12",
        nextFlight: "UA 954 to JFK",
      },
      {
        aircraft: "Airbus A320",
        registration: "N67890",
        airline: "Delta Airlines",
        status: "Maintenance",
        gate: "C5",
        nextFlight: "DL 1288 to ATL",
      },
      {
        aircraft: "Boeing 787-9",
        registration: "N78901",
        airline: "American Airlines",
        status: "In Service",
        gate: "A8",
        nextFlight: "AA 621 to ORD",
      },
      {
        aircraft: "Boeing 737-700",
        registration: "N23456",
        airline: "Southwest",
        status: "Boarding",
        gate: "D3",
        nextFlight: "SW 338 to LAX",
      },
      {
        aircraft: "Airbus A321",
        registration: "N54321",
        airline: "JetBlue",
        status: "In Service",
        gate: "B22",
        nextFlight: "JB 502 to BOS",
      },
    ],
    totalAtTerminal: 12,
  }

  return NextResponse.json(aircraftData)
}


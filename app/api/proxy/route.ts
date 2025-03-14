import { type NextRequest, NextResponse } from "next/server"

// This proxy API allows us to avoid CORS issues when fetching from localhost:8080
export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const path = url.searchParams.get("path")

  if (!path) {
    return NextResponse.json({ error: "Path parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://localhost:8080${path}`)

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch data: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in proxy API:", error)
    return NextResponse.json({ error: "Failed to fetch data from the API" }, { status: 500 })
  }
}


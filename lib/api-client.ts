// Helper functions to fetch data from our API endpoints
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export async function fetchWeather(locationId: string) {
  try {
    console.log(`Fetching weather data from: ${API_URL}/api/v1/weather/${locationId}/current`)
    const response = await fetch(`${API_URL}/api/v1/weather/${locationId}/current`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Weather API error (${response.status}): ${errorText}`)
      throw new Error(`Failed to fetch weather data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

export async function fetchFlights() {
  try {
    console.log(`Fetching flights data from: ${API_URL}/api/v1/flights`)
    const response = await fetch(`${API_URL}/api/v1/flights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Flights API error (${response.status}): ${errorText}`)
      throw new Error(`Failed to fetch flights data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching flights data:", error)
    throw error
  }
}

export async function fetchAircraft() {
  try {
    console.log(`Fetching aircraft data from: ${API_URL}/api/v1/aircraft`)
    const response = await fetch(`${API_URL}/api/v1/aircraft`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Aircraft API error (${response.status}): ${errorText}`)
      throw new Error(`Failed to fetch aircraft data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching aircraft data:", error)
    throw error
  }
}


// Helper functions to fetch data from our API endpoints

export async function fetchWeather(locationId: string) {
  try {
    const response = await fetch(`/api/proxy?path=/api/v1/weather/${locationId}/current`)
    if (!response.ok) {
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
    const response = await fetch("/api/proxy?path=/api/v1/flights")
    if (!response.ok) {
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
    const response = await fetch("/api/proxy?path=/api/v1/aircraft")
    if (!response.ok) {
      throw new Error(`Failed to fetch aircraft data: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching aircraft data:", error)
    throw error
  }
}


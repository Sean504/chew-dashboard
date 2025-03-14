// Weather Types
export interface WeatherData {
  current: {
    temperature: number
    condition: string
    location: string
    timestamp: string
    icon: string
  }
  forecast: Array<{
    day: string
    temp: number
    condition: string
    icon: string
  }>
  details: {
    wind: string
    precipitation: string
    uvIndex: string
  }
}

// Flight Types
export interface FlightData {
  airport: string
  departures: Array<{
    flight: string
    destination: string
    time: string
    status: string
    gate: string
  }>
  nextUpdate: string
}

// Aircraft Types
export interface AircraftData {
  airport: string
  aircraft: Array<{
    aircraft: string
    registration: string
    airline: string
    status: string
    gate: string
    nextFlight: string
  }>
  totalAtTerminal: number
}

// Traffic Types
export interface TrafficData {
  overall: {
    condition: string
    change: number
  }
  map: {
    location: string
    imageUrl: string
  }
  routes: Array<{
    name: string
    color: string
    duration: string
  }>
}

// Media Player Types
export interface MediaData {
  nowPlaying: {
    title: string
    artist: string
    albumArt: string
    currentTime: string
    duration: string
    progress: number
  }
  queue: Array<{
    title: string
    artist: string
    duration: string
  }>
  controls: {
    isPlaying: boolean
  }
}


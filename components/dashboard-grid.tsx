"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Plane,
  Clock,
  ArrowUpRight,
  Car,
  MapPin,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Info,
  AlertTriangle,
} from "lucide-react"
import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { fetchWeather, fetchFlights, fetchAircraft } from "@/lib/api-client"

// Define types based on the API responses
interface Aircraft {
  aircraftCode: string
  model: string
  range: number
  seatsTotal: number
}

interface Flight {
  flightId: number
  flightNo: string
  scheduledDeparture: string
  scheduledArrival: string
  departureAirportCode: string
  arrivalAirportCode: string
  status: string
  aircraftCode: string
  actualDeparture: string | null
  actualArrival: string | null
  departureAirportName: string
  arrivalAirportName: string
  aircraftModel: string
}

interface Weather {
  locationId: string
  timestamp: number
  temperature: number
  humidity: number
  conditions: string
  windSpeed: number
  coordinates: string
}

export function DashboardGrid() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [weatherLocation, setWeatherLocation] = useState("SFO")
  const [weatherData, setWeatherData] = useState<Weather | null>(null)
  const [aircraftData, setAircraftData] = useState<Aircraft[]>([])
  const [flightData, setFlightData] = useState<Flight[]>([])
  const [trafficData, setTrafficData] = useState({
    overall: { condition: "Moderate", change: 12 },
    routes: [
      { name: "Highway 101", color: "primary", duration: "32 min" },
      { name: "Interstate 280", color: "secondary", duration: "45 min" },
      { name: "Market Street", color: "accent", duration: "18 min" },
    ],
  })
  const [mediaData, setMediaData] = useState({
    nowPlaying: {
      title: "Mint Green Dreams",
      artist: "Modern Vibes",
      progress: 0.66,
      currentTime: "2:14",
      duration: "3:45",
    },
    queue: [
      { title: "Paper Bag Memories", artist: "The Mocha Collective", duration: "4:12" },
      { title: "Charcoal Nights", artist: "Grey Tones", duration: "3:28" },
    ],
  })
  const [loading, setLoading] = useState({
    weather: true,
    flights: true,
    aircraft: true,
    traffic: false,
    media: false,
  })
  const [error, setError] = useState({
    weather: false,
    flights: false,
    aircraft: false,
    traffic: false,
    media: false,
  })

  // Fetch weather data when location changes
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading((prev) => ({ ...prev, weather: true }))
      setError((prev) => ({ ...prev, weather: false }))

      try {
        const data = await fetchWeather(weatherLocation)
        setWeatherData(data[0]) // API returns an array with one item
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError((prev) => ({ ...prev, weather: true }))
      } finally {
        setLoading((prev) => ({ ...prev, weather: false }))
      }
    }

    getWeatherData()
  }, [weatherLocation])

  // Fetch flights and aircraft data on component mount
  useEffect(() => {
    const getData = async () => {
      // Fetch flights
      try {
        setLoading((prev) => ({ ...prev, flights: true }))
        const flightsData = await fetchFlights()
        setFlightData(flightsData)
      } catch (error) {
        console.error("Error fetching flights data:", error)
        setError((prev) => ({ ...prev, flights: true }))
      } finally {
        setLoading((prev) => ({ ...prev, flights: false }))
      }

      // Fetch aircraft
      try {
        setLoading((prev) => ({ ...prev, aircraft: true }))
        const aircraftData = await fetchAircraft()
        setAircraftData(aircraftData)
      } catch (error) {
        console.error("Error fetching aircraft data:", error)
        setError((prev) => ({ ...prev, aircraft: true }))
      } finally {
        setLoading((prev) => ({ ...prev, aircraft: false }))
      }
    }

    getData()
  }, [])

  // Helper function to get weather icon based on conditions
  const getWeatherIcon = (conditions: string) => {
    const conditionsLower = conditions.toLowerCase()
    if (conditionsLower.includes("cloud")) return <Cloud className="h-12 w-12 text-primary" />
    if (conditionsLower.includes("rain") || conditionsLower.includes("shower"))
      return <CloudRain className="h-12 w-12 text-primary" />
    if (conditionsLower.includes("sun") || conditionsLower.includes("clear"))
      return <Sun className="h-12 w-12 text-primary" />
    return <Cloud className="h-12 w-12 text-primary" />
  }

  // Helper function to format date from ISO string
  const formatDateTime = (isoString: string | null) => {
    if (!isoString) return "N/A"
    try {
      return format(parseISO(isoString), "h:mm a")
    } catch (e) {
      return "Invalid date"
    }
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "arrived":
        return "bg-green-500/50 text-green-700"
      case "departed":
        return "bg-blue-500/50 text-blue-700"
      case "delayed":
        return "bg-yellow-500/50 text-yellow-700"
      case "cancelled":
        return "bg-red-500/50 text-red-700"
      case "scheduled":
        return "bg-accent/30"
      default:
        return "bg-accent/30"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6 h-[calc(100vh-12rem)]">
      {/* Top Left Panel - Weather */}
      <Card
        className={`lg:col-span-3 lg:row-span-1 overflow-hidden border-none shadow-md group relative transition-all duration-300 hover:scale-[1.25] hover:shadow-xl hover:z-20 ${activeCard === 0 ? "ring-2 ring-primary ring-offset-2" : "hover:ring-2 hover:ring-primary hover:ring-offset-2"}`}
        style={{ transformOrigin: "top left" }}
        onMouseEnter={() => setActiveCard(0)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <CardHeader className="bg-primary/10 pb-2 relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium flex items-center">
                <span>Weather Forecast</span>
                <Cloud className="h-5 w-5 text-primary ml-2 group-hover:text-primary/80 transition-colors" />
              </CardTitle>
              <CardDescription>Current conditions</CardDescription>
            </div>
            <Select value={weatherLocation} onValueChange={setWeatherLocation}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SFO">SFO</SelectItem>
                <SelectItem value="LAX">LAX</SelectItem>
                <SelectItem value="JFK">JFK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {loading.weather ? (
            <div className="flex items-center justify-center h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error.weather ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-destructive">
              <AlertTriangle className="h-12 w-12 mb-2" />
              <p>Failed to load weather data</p>
            </div>
          ) : weatherData ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {getWeatherIcon(weatherData.conditions)}
                  <div className="ml-4">
                    <div className="text-3xl font-bold group-hover:text-primary transition-colors">
                      {weatherData.temperature.toFixed(0)}°F
                    </div>
                    <div className="text-sm text-muted-foreground">{weatherData.conditions}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{weatherData.locationId} Airport</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(weatherData.timestamp * 1000).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex items-center p-3 rounded-lg bg-accent/10">
                  <Wind className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-xs text-muted-foreground">Wind</div>
                    <div className="text-sm font-medium">{weatherData.windSpeed} mph</div>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-accent/10">
                  <CloudRain className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                    <div className="text-sm font-medium">{weatherData.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center p-3 rounded-lg bg-accent/10">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="text-sm font-medium truncate" title={weatherData.coordinates}>
                      {weatherData.coordinates}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px]">
              <p>No weather data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Right Panel - Flight Departures */}
      <Card
        className={`lg:col-span-1 lg:row-span-2 overflow-hidden border-none shadow-md group relative transition-all duration-300 hover:scale-[1.15] hover:shadow-xl hover:z-20 ${activeCard === 1 ? "ring-2 ring-primary ring-offset-2" : "hover:ring-2 hover:ring-primary hover:ring-offset-2"}`}
        style={{ transformOrigin: "center" }}
        onMouseEnter={() => setActiveCard(1)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <CardHeader className="bg-accent/30 pb-2 relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Flight Information</span>
            <Plane className="h-5 w-5 text-accent-foreground group-hover:text-primary transition-colors" />
          </CardTitle>
          <CardDescription>Flight and aircraft data</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="departures" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="departures">Flights</TabsTrigger>
              <TabsTrigger value="aircraft">Aircraft</TabsTrigger>
            </TabsList>

            <TabsContent value="departures" className="mt-0">
              {loading.flights ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error.flights ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-destructive">
                  <AlertTriangle className="h-12 w-12 mb-2" />
                  <p>Failed to load flight data</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="space-y-4 mt-2 max-h-[400px] overflow-y-auto pr-1">
                    {flightData.slice(0, 6).map((flight) => (
                      <div key={flight.flightId} className="border-b border-muted pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{flight.flightNo}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(flight.status)}`}>
                            {flight.status}
                          </div>
                        </div>
                        <div className="text-sm mt-1">
                          {flight.departureAirportCode} → {flight.arrivalAirportCode}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{flight.aircraftModel}</div>
                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(flight.scheduledDeparture)}
                          </div>
                          <div>
                            Gate {flight.departureAirportCode}-{Math.floor(Math.random() * 20) + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Total Flights</div>
                      <div className="text-sm font-medium flex items-center justify-center">
                        <Plane className="h-4 w-4 mr-1 text-primary" />
                        <span>{flightData.length} flights</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="aircraft" className="mt-0">
              {loading.aircraft ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error.aircraft ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-destructive">
                  <AlertTriangle className="h-12 w-12 mb-2" />
                  <p>Failed to load aircraft data</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="space-y-4 mt-2 max-h-[400px] overflow-y-auto pr-1">
                    {aircraftData.map((aircraft) => (
                      <div key={aircraft.aircraftCode} className="border-b border-muted pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium">{aircraft.model}</div>
                          <div className="text-xs px-2 py-1 rounded-full bg-accent/30">{aircraft.aircraftCode}</div>
                        </div>
                        <div className="text-sm mt-1">Range: {aircraft.range} km</div>
                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            {aircraft.seatsTotal} seats
                          </div>
                          <div>{flightData.filter((f) => f.aircraftCode === aircraft.aircraftCode).length} flights</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="bg-primary/10 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Fleet Size</div>
                      <div className="text-sm font-medium flex items-center justify-center">
                        <Info className="h-4 w-4 mr-1 text-primary" />
                        <span>{aircraftData.length} aircraft</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Bottom Left Panel - Traffic */}
      <Card
        className={`lg:col-span-1 lg:row-span-1 overflow-hidden border-none shadow-md group relative transition-all duration-300 hover:scale-[1.25] hover:shadow-xl hover:z-20 ${activeCard === 2 ? "ring-2 ring-primary ring-offset-2" : "hover:ring-2 hover:ring-primary hover:ring-offset-2"}`}
        style={{ transformOrigin: "bottom left" }}
        onMouseEnter={() => setActiveCard(2)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <CardHeader className="bg-secondary/20 pb-2 relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Current Traffic</span>
            <Car className="h-5 w-5 text-secondary-foreground group-hover:text-primary transition-colors" />
          </CardTitle>
          <CardDescription>Real-time traffic conditions</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold group-hover:text-primary transition-colors">Moderate</div>
              <div className="flex items-center text-sm text-primary">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span>12%</span>
              </div>
            </div>

            <div className="relative h-32 w-full bg-muted/30 rounded-lg overflow-hidden mb-4">
              {/* Simplified traffic map visualization */}
              <div className="absolute inset-0 opacity-70 bg-[url('/placeholder.svg?height=200&width=300')] bg-cover"></div>
              <div className="absolute top-2 right-2 bg-background/80 rounded-md px-2 py-1 text-xs font-medium backdrop-blur-sm">
                <MapPin className="h-3 w-3 inline mr-1 text-primary" />
                Downtown
              </div>

              {/* Traffic indicators */}
              <div className="absolute top-1/4 left-1/4 w-16 h-2 bg-primary/80 rounded-full transform rotate-45"></div>
              <div className="absolute top-1/2 left-1/3 w-20 h-2 bg-secondary/80 rounded-full transform -rotate-15"></div>
              <div className="absolute bottom-1/4 right-1/4 w-12 h-2 bg-primary/80 rounded-full transform rotate-90"></div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary/80 mr-2"></div>
                  <span>Highway 101</span>
                </div>
                <span className="font-medium">32 min</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-secondary/80 mr-2"></div>
                  <span>Interstate 280</span>
                </div>
                <span className="font-medium">45 min</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent/80 mr-2"></div>
                  <span>Market Street</span>
                </div>
                <span className="font-medium">18 min</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Right Panel - Media Player */}
      <Card
        className={`lg:col-span-2 lg:row-span-1 overflow-hidden border-none shadow-md group relative transition-all duration-300 hover:scale-[1.25] hover:shadow-xl hover:z-20 ${activeCard === 3 ? "ring-2 ring-primary ring-offset-2" : "hover:ring-2 hover:ring-primary hover:ring-offset-2"}`}
        style={{ transformOrigin: "bottom right" }}
        onMouseEnter={() => setActiveCard(3)}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <CardHeader className="bg-accent/20 pb-2 relative">
          <div className="absolute top-0 left-0 h-1 w-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Media Player</span>
            <Volume2 className="h-5 w-5 text-accent-foreground group-hover:text-primary transition-colors" />
          </CardTitle>
          <CardDescription>Now playing</CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start space-x-3">
            <div className="w-20 h-20 rounded-md bg-primary/20 flex-shrink-0 overflow-hidden">
              <img
                src="/placeholder.svg?height=100&width=100"
                alt="Album cover"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-base group-hover:text-primary transition-colors">Mint Green Dreams</h3>
              <p className="text-sm text-muted-foreground">Modern Vibes</p>

              <div className="mt-3 space-y-2">
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-2/3 rounded-full group-hover:shadow-[0_0_8px_rgba(var(--primary),0.6)]"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2:14</span>
                  <span>3:45</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 mt-3">
                <button className="p-2 rounded-full hover:bg-muted/50 transition-colors">
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button className="p-2 rounded-full hover:bg-muted/50 transition-colors">
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Up Next</h4>
            <div className="space-y-2">
              {[
                { title: "Paper Bag Memories", artist: "The Mocha Collective", duration: "4:12" },
                { title: "Charcoal Nights", artist: "Grey Tones", duration: "3:28" },
              ].map((track, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium">{track.title}</div>
                    <div className="text-xs text-muted-foreground">{track.artist}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


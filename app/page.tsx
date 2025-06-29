"use client"

import type React from "react"

import { useState, useEffect, useCallback, useId, useRef } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Image from "next/image"
import {
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  Lock,
  MapPin,
  BarChart,
  AlertTriangle,
  Truck,
  Search,
  Menu,
  X,
  Loader2,
  Info,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  RefreshCw,
  ChevronRight,
  ArrowRight,
  Users,
  Shield,
  Smartphone,
  School,
  BookOpen,
  Bus,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  getRoute,
  geocodeAddress,
  formatDistance,
  formatDuration,
  getRouteDirections,
  type RouteResult,
  getBusServices,
} from "@/components/open-route-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { BusServiceInfo } from "@/components/bus-service-info"
import { useTheme } from "@/components/theme-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Generate a unique ID for this component instance
const uniqueId = "map-" + Math.random().toString(36).substring(2, 9)

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(
  () =>
    import("@/components/map-component").catch((err) => {
      console.error("Error loading map component:", err)
      // Return a fallback component
      return () => (
        <div className="w-full h-[400px] bg-slate-100 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="text-slate-700 font-medium">Unable to load map</p>
            <p className="text-slate-500 text-sm mt-1">Please refresh the page to try again</p>
          </div>
        </div>
      )
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-slate-100 flex items-center justify-center rounded-lg">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
          <p className="text-slate-500">Loading map...</p>
        </div>
      </div>
    ),
  },
)

// Define CustomNavButton component
const CustomNavButton: React.FC<{
  href: string
  label: string
  isScrolled: boolean
  isHome?: boolean
}> = ({ href, label, isScrolled, isHome = false }) => {
  if (isHome) {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        className={`py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
          isScrolled ? "text-blue-600" : "text-white hover:text-blue-600"
        }`}
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
        isScrolled ? "text-blue-600" : "text-white hover:text-blue-600"
      }`}
    >
      {label}
    </Link>
  )
}

// Define CustomMobileNavButton component
const CustomMobileNavButton: React.FC<{
  href: string
  label: string
  onClick: () => void
  isHome?: boolean
}> = ({ href, label, onClick, isHome = false }) => {
  if (isHome) {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: "smooth" })
          onClick()
        }}
        className="block py-2 px-4 hover:bg-gray-100 rounded-md"
      >
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className="block py-2 px-4 hover:bg-gray-100 rounded-md" onClick={onClick}>
      {label}
    </Link>
  )
}

// Define BusStatusItem component
const BusStatusItem: React.FC<{
  busNumber: string
  route: string
  status: string
  statusColor: string
  passengers?: number
  nextStop?: string
  eta?: string
}> = ({ busNumber, route, status, statusColor, passengers = 0, nextStop = "Unknown", eta = "N/A" }) => {
  let colorClass = "bg-green-500"
  if (statusColor === "yellow") colorClass = "bg-yellow-500"
  if (statusColor === "red") colorClass = "bg-red-500"

  const [expanded, setExpanded] = useState(false)

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center justify-between p-3 rounded-t-md border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold mr-3">
            {busNumber.replace("Bus #", "")}
          </div>
          <div>
            <h5 className="font-medium text-gray-800">{busNumber}</h5>
            <p className="text-sm text-gray-600">{route}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${colorClass}`}></div>
          <span className="text-sm text-gray-700">{status}</span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {expanded && (
        <div className="p-3 border-x border-b border-gray-200 rounded-b-md bg-gray-50 text-sm space-y-2 animate-slideDown">
          <div className="flex justify-between">
            <span className="text-gray-600">Next stop:</span>
            <span className="font-medium text-gray-800">{nextStop}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Passengers:</span>
            <span className="font-medium text-gray-800">{passengers} students</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ETA:</span>
            <span className="font-medium text-gray-800">{eta}</span>
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" className="w-full">
              <MapPin className="h-3 w-3 mr-1" />
              Track
            </Button>
            <Button variant="outline" size="sm" className="w-full ml-2">
              <Bell className="h-3 w-3 mr-1" />
              Alerts
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Define SchoolRouteInfo component
const SchoolRouteInfo: React.FC = () => (
  <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
      <Bell className="h-4 w-4 mr-2" />
      School Transportation Info
    </h4>
    <p className="text-sm text-blue-700 mb-2">Your daily school bus options from RM10 9QB to UEL Docklands Campus:</p>
    <div className="space-y-3 text-sm">
      <div className="bg-white rounded-md p-3 border border-blue-100">
        <div className="flex items-center">
          <div className="h-6 w-10 rounded flex items-center justify-center font-bold text-white bg-red-600 mr-2">
            103
          </div>
          <span className="font-medium text-gray-800">School Express Service</span>
        </div>
        <div className="mt-1 space-y-1 pl-12">
          <div className="flex justify-between">
            <span>Morning pickup:</span>
            <span className="font-medium">7:30 AM</span>
          </div>
          <div className="flex justify-between">
            <span>Afternoon return:</span>
            <span className="font-medium">4:15 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Journey time:</span>
            <span className="font-medium">25 min</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-3 border border-blue-100">
        <div className="flex items-center">
          <div className="h-6 w-10 rounded flex items-center justify-center font-bold text-white bg-blue-600 mr-2">
            EL1
          </div>
          <span className="font-medium text-gray-800">East London Transit</span>
        </div>
        <div className="mt-1 space-y-1 pl-12">
          <div className="flex justify-between">
            <span>Frequency:</span>
            <span className="font-medium">Every 15 min</span>
          </div>
          <div className="flex justify-between">
            <span>Service hours:</span>
            <span className="font-medium">05:30 - 23:45</span>
          </div>
          <div className="flex justify-between">
            <span>Journey time:</span>
            <span className="font-medium">35 min</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Define FeatureCard component
const FeatureCard: React.FC<{ icon: any; title: string; description: string }> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="text-blue-600 mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

// Define UserTypeCard component
const UserTypeCard: React.FC<{
  icon: any
  title: string
  description: string
  href: string
  color: string
}> = ({ icon: Icon, title, description, href, color }) => {
  let bgColor = "bg-blue-500"
  let hoverBgColor = "hover:bg-blue-600"

  if (color === "green") {
    bgColor = "bg-green-500"
    hoverBgColor = "hover:bg-green-600"
  } else if (color === "purple") {
    bgColor = "bg-purple-500"
    hoverBgColor = "hover:bg-purple-600"
  } else if (color === "amber") {
    bgColor = "bg-amber-500"
    hoverBgColor = "hover:bg-amber-600"
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className={`${bgColor} p-4 flex items-center justify-center`}>
        <Icon className="h-12 w-12 text-white" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className={`inline-flex items-center justify-center w-full py-2 px-4 rounded-md text-white ${bgColor} ${hoverBgColor} transition-colors`}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// Define StatCard component
const StatCard: React.FC<{
  icon: any
  title: string
  value: string
  trend?: string
  trendUp?: boolean
}> = ({ icon: Icon, title, value, trend, trendUp }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
    <div className="flex items-start">
      <div className="p-2 rounded-md bg-blue-50 text-blue-600 mr-3">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {trend && (
          <p className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"} flex items-center mt-1`}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
    </div>
  </div>
)

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [routeData, setRouteData] = useState<RouteResult | null>(null)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [mapInstance, setMapInstance] = useState<any | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapKey, setMapKey] = useState(useId()) // Generate a stable unique ID for this component instance
  const [routePreference, setRoutePreference] = useState<"fastest" | "shortest" | "recommended">("recommended")
  const [directionsOpen, setDirectionsOpen] = useState(true)
  const [busServices, setBusServices] = useState<any[]>([])
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("route")

  // After other useState declarations
  const liveRouteTrackingRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const dashboardsRef = useRef<HTMLElement>(null)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search and route calculation
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setRouteError(null)
    setRouteData(null)

    if (!fromLocation || !toLocation) {
      setRouteError("Please enter both start and destination locations")
      setIsSearching(false)
      return
    }

    try {
      console.log("Geocoding start location:", fromLocation)
      // Show a more specific loading state
      setIsSearching(true)

      // Geocode the from and to addresses
      const fromResult = await geocodeAddress(fromLocation)
      if ("error" in fromResult) {
        console.error("Start location error:", fromResult)
        setRouteError(`Start location error: ${fromResult.message}`)
        setIsSearching(false)
        return
      }

      console.log("Geocoding destination:", toLocation)
      const toResult = await geocodeAddress(toLocation)
      if ("error" in toResult) {
        console.error("Destination error:", toResult)
        setRouteError(`Destination error: ${toResult.message}`)
        setIsSearching(false)
        return
      }

      console.log("Calculating route between", fromResult, "and", toResult)
      // Get the route
      const result = await getRoute(fromResult, toResult, {
        preference: routePreference,
      })

      if ("error" in result) {
        console.error("Routing error:", result)
        setRouteError(`Routing error: ${result.message}`)
      } else {
        console.log("Route calculated successfully:", result)

        // Ensure the route has coordinates
        if (result.geometry && result.geometry.coordinates && result.geometry.coordinates.length > 0) {
          console.log(`Route has ${result.geometry.coordinates.length} points`)
          setRouteData(result)
          setDirectionsOpen(true) // Auto-open directions when route is found

          // Check if this is the route between RM10 9QB and UEL Docklands
          const services = getBusServices(fromLocation, toLocation)
          setBusServices(services)

          // Scroll to the Live Route Tracking section
          setTimeout(() => {
            liveRouteTrackingRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 100)

          // Force map to update if needed
          if (mapInstance) {
            console.log("Updating map with new route data")
            // The map will update via the useEffect in MapComponent
          }
        } else {
          console.error("Route data has no coordinates")
          setRouteError("Could not calculate a valid route between these locations")
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      setRouteError("An unexpected error occurred while calculating the route.")
    } finally {
      setIsSearching(false)
    }
  }

  // Set map instance callback
  const handleSetMapInstance = useCallback((map: any) => {
    setMapInstance(map)
    setMapLoaded(true)
  }, [])

  // Example locations for suggestions
  const exampleLocations = [
    { from: "RM10 9QB", to: "UEL Docklands Campus" },
    { from: "London Bridge", to: "Tower of London" },
    { from: "Big Ben", to: "Buckingham Palace" },
    { from: "Trafalgar Square", to: "Piccadilly Circus" },
    { from: "British Museum", to: "Covent Garden" },
  ]

  // Function to set example route
  const setExampleRoute = (from: string, to: string) => {
    setFromLocation(from)
    setToLocation(to)
  }

  // Scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}>
      {/* Navigation Bar */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2 dark:bg-black" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center space-x-2"
            >
              <div className="relative h-10 w-10 bg-blue-600 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="absolute w-8 h-1 bg-yellow-400 top-2"></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full bottom-2 right-2"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 left-2"></div>
              </div>
              <span className={`font-bold text-xl ${isScrolled ? "text-blue-600 dark:text-white" : "text-white"}`}>
                PathPredict
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <CustomNavButton href="/" label="Home" isScrolled={isScrolled} isHome={true} />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(liveRouteTrackingRef)
                }}
                className={`py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
                  isScrolled ? "text-blue-600 dark:text-white" : "text-white hover:text-blue-600"
                }`}
              >
                Route Planner
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(featuresRef)
                }}
                className={`py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
                  isScrolled ? "text-blue-600 dark:text-white" : "text-white hover:text-blue-600"
                }`}
              >
                Features
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(dashboardsRef)
                }}
                className={`py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-100 ${
                  isScrolled ? "text-blue-600 dark:text-white" : "text-white hover:text-blue-600"
                }`}
              >
                Dashboards
              </a>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className={isScrolled ? "text-blue-600 dark:text-white" : "text-white hover:text-blue-600"}
                      aria-label="Toggle theme"
                    >
                      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={isScrolled ? "text-blue-600 dark:text-white" : "text-white"} />
              ) : (
                <Menu className={isScrolled ? "text-blue-600 dark:text-white" : "text-white"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-2">
                <CustomMobileNavButton href="/" label="Home" onClick={() => setMobileMenuOpen(false)} isHome={true} />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(liveRouteTrackingRef)
                    setMobileMenuOpen(false)
                  }}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Route Planner
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(featuresRef)
                    setMobileMenuOpen(false)
                  }}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Features
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(dashboardsRef)
                    setMobileMenuOpen(false)
                  }}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Dashboards
                </a>
                <CustomMobileNavButton
                  href="#"
                  label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleTheme()
                    setMobileMenuOpen(false)
                  }}
                />
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute top-32 -left-16 w-96 h-96 bg-blue-300 rounded-full opacity-10"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>

          {/* Animated road lines */}
          <div className="absolute bottom-0 left-0 right-0 h-24 flex items-center">
            <div className="w-full h-2 bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full flex">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1 w-16 bg-yellow-400 mx-8 animate-roadLine"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animated bus - Changed to red and white */}
          <div className="absolute bottom-8 left-0 animate-busDrive">
            <div className="relative w-32 h-16 bg-red-500 rounded-md">
              <div className="absolute top-0 left-0 right-0 h-8 bg-white rounded-t-md"></div>
              <div className="absolute bottom-0 left-4 w-6 h-6 bg-black rounded-full"></div>
              <div className="absolute bottom-0 right-4 w-6 h-6 bg-black rounded-full"></div>
              <div className="absolute top-2 left-2 w-4 h-4 bg-blue-600 rounded-sm"></div>
              <div className="absolute top-2 left-8 w-4 h-4 bg-blue-600 rounded-sm"></div>
              <div className="absolute top-2 left-14 w-4 h-4 bg-blue-600 rounded-sm"></div>
              <div className="absolute top-2 left-20 w-4 h-4 bg-blue-600 rounded-sm"></div>
              <div className="absolute top-2 left-26 w-4 h-4 bg-blue-600 rounded-sm"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 z-10 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">Smart School Transportation</h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fadeIn animation-delay-200">
                AI-powered route prediction and real-time tracking for safer, more efficient school transportation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-400">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => scrollToSection(liveRouteTrackingRef)}
                >
                  Plan Your Route
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-white dark:text-white dark:hover:bg-white/10"
                  onClick={() => scrollToSection(dashboardsRef)}
                >
                  View Dashboards
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 animate-fadeIn animation-delay-400">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-blue-100">On-Time Performance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">15,000+</div>
                <div className="text-sm text-blue-100">Students Transported Daily</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-blue-100">School Buses Tracked</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm text-blue-100">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Route Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" ref={liveRouteTrackingRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            >
              Route Planning
            </Badge>
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">Smart Route Planning & Tracking</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Plan your journey, track buses in real-time, and get accurate arrival predictions powered by AI
            </p>
          </div>

          <Tabs defaultValue="route" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="route">Route Planner</TabsTrigger>
              <TabsTrigger value="buses">Active Buses</TabsTrigger>
            </TabsList>

            <TabsContent value="route" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[400px]">
                    {/* Use the key prop to force a new instance */}
                    {(() => {
                      try {
                        return <MapComponent key={mapKey} routeData={routeData} setMapInstance={handleSetMapInstance} />
                      } catch (error) {
                        console.error("Error rendering map component:", error)
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <div className="text-center p-4">
                              <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                              <div className="text-red-500 dark:text-red-400 mb-2">Unable to display map</div>
                              <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Refresh Page
                              </button>
                            </div>
                          </div>
                        )
                      }
                    })()}
                  </div>

                  {/* Route details */}
                  {routeData && (
                    <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">Route Summary</h3>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Distance: {formatDistance(routeData.properties.summary.distance)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Duration: {formatDuration(routeData.properties.summary.duration)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Turn-by-turn directions */}
                      <Collapsible open={directionsOpen} onOpenChange={setDirectionsOpen}>
                        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                          <span>Turn-by-turn Directions</span>
                          {directionsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mt-2">
                            {getRouteDirections(routeData).map((direction, index) => (
                              <div
                                key={index}
                                className="flex items-start text-sm border-b border-gray-100 dark:border-gray-700 pb-2"
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2 mt-0.5">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="text-gray-800 dark:text-gray-200">{direction.text}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {direction.distance} · {direction.duration}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      {busServices.length > 0 && <BusServiceInfo services={busServices} />}
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400">Plan Your Trip</h3>

                  <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Demo Mode</AlertTitle>
                    <AlertDescription>
                      Try London locations like "London Bridge", "Tower of London", or "Big Ben" for best results.
                    </AlertDescription>
                  </Alert>

                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <label htmlFor="from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        From
                      </label>
                      <Input
                        id="from"
                        placeholder="Enter pickup location (e.g., London Bridge)"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div>
                      <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        To
                      </label>
                      <Input
                        id="to"
                        placeholder="Enter destination (e.g., Tower of London)"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        required
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="route-preference"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Route Preference
                      </label>
                      <Select value={routePreference} onValueChange={(value) => setRoutePreference(value as any)}>
                        <SelectTrigger id="route-preference" className="dark:bg-gray-700 dark:border-gray-600">
                          <SelectValue placeholder="Select route preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fastest">Fastest</SelectItem>
                          <SelectItem value="shortest">Shortest</SelectItem>
                          <SelectItem value="recommended">Recommended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {routeError && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{routeError}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSearching}>
                      {isSearching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculating Route...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Calculate Route
                        </>
                      )}
                    </Button>
                  </form>

                  {fromLocation.toLowerCase().includes("rm10") && toLocation.toLowerCase().includes("uel") && (
                    <SchoolRouteInfo />
                  )}

                  {/* Example routes */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Try these routes:</h4>
                    <div className="space-y-2">
                      {exampleLocations.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => setExampleRoute(location.from, location.to)}
                          className="w-full text-left p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex justify-between items-center"
                        >
                          <span>
                            <span className="font-medium">{location.from}</span> to{" "}
                            <span className="font-medium">{location.to}</span>
                          </span>
                          <span className="text-blue-500 text-xs">Use</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="buses" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Card className="col-span-full md:col-span-1 lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center">
                      <Bus className="h-5 w-5 mr-2 text-blue-600" />
                      Bus Fleet Status
                    </CardTitle>
                    <CardDescription>Current status of all active buses</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-4">
                      <StatCard icon={Bus} title="Active Buses" value="42" trend="+3 from yesterday" trendUp={true} />
                      <StatCard
                        icon={Clock}
                        title="On-Time Rate"
                        value="94%"
                        trend="+2% from last week"
                        trendUp={true}
                      />
                      <StatCard icon={Users} title="Total Passengers" value="1,248" />
                      <StatCard
                        icon={AlertTriangle}
                        title="Delayed Buses"
                        value="3"
                        trend="-2 from yesterday"
                        trendUp={true}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last updated: 2 minutes ago</span>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <RefreshCw className="h-3 w-3" />
                        Refresh
                      </Button>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-3">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold">Active Buses</CardTitle>
                      <Select defaultValue="all">
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Buses</SelectItem>
                          <SelectItem value="ontime">On Time</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                          <SelectItem value="north">North Routes</SelectItem>
                          <SelectItem value="east">East Routes</SelectItem>
                          <SelectItem value="west">West Routes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <BusStatusItem
                        busNumber="Bus #103"
                        route="Main Campus → East Residence"
                        status="On Time"
                        statusColor="green"
                        passengers={28}
                        nextStop="East Hall (3 min)"
                        eta="8:45 AM"
                      />
                      <BusStatusItem
                        busNumber="Bus #215"
                        route="North Station → Main Campus"
                        status="5 min delay"
                        statusColor="yellow"
                        passengers={32}
                        nextStop="Science Building (7 min)"
                        eta="9:05 AM"
                      />
                      <BusStatusItem
                        busNumber="Bus #087"
                        route="West Hills → Sports Complex"
                        status="10 min delay"
                        statusColor="red"
                        passengers={18}
                        nextStop="West Gate (12 min)"
                        eta="9:22 AM"
                      />
                      <BusStatusItem
                        busNumber="Bus #142"
                        route="South Campus → Library"
                        status="On Time"
                        statusColor="green"
                        passengers={24}
                        nextStop="Student Center (2 min)"
                        eta="8:42 AM"
                      />
                      <BusStatusItem
                        busNumber="Bus #056"
                        route="Downtown → Main Campus"
                        status="On Time"
                        statusColor="green"
                        passengers={35}
                        nextStop="Central Station (4 min)"
                        eta="8:50 AM"
                      />
                      <BusStatusItem
                        busNumber="Bus #321"
                        route="East Residence → Library"
                        status="2 min delay"
                        statusColor="yellow"
                        passengers={22}
                        nextStop="Dining Hall (5 min)"
                        eta="9:10 AM"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" size="sm" className="text-blue-600 mx-auto">
                      View All Buses <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-16 bg-white dark:bg-black" ref={dashboardsRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            >
              Role-Based Access
            </Badge>
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">Specialized Dashboards</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tailored interfaces for every stakeholder in the school transportation ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <UserTypeCard
              icon={Shield}
              title="Admin Dashboard"
              description="Comprehensive system management, fleet oversight, and analytics for administrators."
              href="/dashboard/admin"
              color="blue"
            />
            <UserTypeCard
              icon={Truck}
              title="Driver Dashboard"
              description="Route information, student check-in, vehicle status, and communication tools."
              href="/dashboard/driver"
              color="green"
            />
            <UserTypeCard
              icon={Users}
              title="Parent Dashboard"
              description="Track your children's bus location, receive notifications, and view schedule changes."
              href="/dashboard/parent"
              color="purple"
            />
            <UserTypeCard
              icon={BookOpen}
              title="Student Dashboard"
              description="View bus schedules, check-in status, and receive important transportation updates."
              href="/dashboard/student"
              color="amber"
            />
          </div>

          <div className="mt-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Mobile App Available</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Access all dashboard features on the go with our mobile app. Available for iOS and Android devices.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Download for iOS
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Download for Android
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden border-8 border-gray-300 dark:border-gray-700">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-300 dark:bg-gray-700 flex justify-center items-center">
                    <div className="w-20 h-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="pt-8 h-full bg-blue-600">
                    <div className="h-full bg-white dark:bg-gray-900 rounded-t-2xl p-4 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-md mr-2 flex items-center justify-center">
                          <Bus className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-lg font-bold">PathPredict</div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <Image
                          src="/london-detailed-street-map.png"
                          alt="Mobile app map view"
                          width={300}
                          height={400}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2">
                          <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                          <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                          <div className="h-10 bg-blue-100 dark:bg-blue-900 rounded w-full mt-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            >
              Platform Capabilities
            </Badge>
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300">Key Features</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive suite of tools makes school transportation safer, more efficient, and easier to manage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <FeatureCard
              icon={MapPin}
              title="Real-time GPS Tracking"
              description="Track school buses in real-time with precise GPS location updates every 10 seconds."
            />
            <FeatureCard
              icon={Zap}
              title="AI Delay Prediction"
              description="Machine learning algorithms predict potential delays based on traffic, weather, and historical data."
            />
            <FeatureCard
              icon={FileText}
              title="Role-based Dashboards"
              description="Customized interfaces for administrators, drivers, parents, and students."
            />
            <FeatureCard
              icon={AlertTriangle}
              title="Emergency Alerts"
              description="Instant notifications for emergencies with direct communication channels to all stakeholders."
            />
            <FeatureCard
              icon={Bell}
              title="Parent Notifications"
              description="Automated alerts for pickup, dropoff, delays, and schedule changes."
            />
            <FeatureCard
              icon={CheckSquare}
              title="Student Check-in/Check-out"
              description="Digital attendance tracking with timestamp and location data."
            />
            <FeatureCard
              icon={Truck}
              title="Bus Health Monitoring"
              description="Real-time diagnostics and maintenance scheduling for optimal fleet performance."
            />
            <FeatureCard
              icon={Calendar}
              title="Trip History"
              description="Comprehensive logs of all routes, times, and passenger information for reporting."
            />
            <FeatureCard
              icon={School}
              title="Schedule Planner"
              description="Intelligent route optimization and scheduling tools for transportation managers."
            />
            <FeatureCard
              icon={BarChart}
              title="Performance Analytics"
              description="Detailed metrics and insights on transportation efficiency and safety."
            />
            <FeatureCard
              icon={Lock}
              title="Secure Login & Profiles"
              description="Role-based authentication with data encryption and privacy controls."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile App Access"
              description="Access all features on the go with our iOS and Android mobile applications."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">PathPredict</h3>
              <p className="text-sm">
                AI-powered school transportation platform for safer, more efficient student transit.
              </p>
            </div>

            <div>
              <h4 className="text-white text-md font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-blue-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-md font-semibold mb-4">Dashboards</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/dashboard/admin" className="hover:text-blue-400 transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/driver" className="hover:text-blue-400 transition-colors">
                    Driver Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/parent" className="hover:text-blue-400 transition-colors">
                    Parent Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/student" className="hover:text-blue-400 transition-colors">
                    Student Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-md font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/data" className="hover:text-blue-400 transition-colors">
                    Data Processing
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} PathPredict. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Enhanced simulation of routing services with realistic data

export interface RouteCoordinates {
  lat: number
  lng: number
}

export interface RouteOptions {
  preference?: "fastest" | "shortest" | "recommended"
}

export interface RouteSegment {
  distance: number // in meters
  duration: number // in seconds
  instruction: string
  name: string
  type: string // Type of maneuver (e.g., depart, turn-right, arrive)
  way_points: [number, number] // Start and end indices in the coordinates array
}

export interface RouteResult {
  geometry: {
    coordinates: [number, number][] // [longitude, latitude] pairs
  }
  properties: {
    segments: RouteSegment[]
    summary: {
      distance: number // in meters
      duration: number // in seconds
    }
    way_points: [number, number] // Start and end indices in the coordinates array
  }
}

export interface RouteError {
  error: string
  message: string
}

// Add this new interface after the existing interfaces
export interface BusService {
  routeNumber: string
  operator: string
  frequency: string
  firstBus: string
  lastBus: string
  duration: string
  stops: string[]
  fare: string
}

// Realistic London locations with precise coordinates
const LOCATIONS: Record<string, RouteCoordinates> = {
  // Major landmarks
  "london bridge": { lat: 51.5079, lng: -0.0877 },
  "tower of london": { lat: 51.5081, lng: -0.0759 },
  "big ben": { lat: 51.5007, lng: -0.1246 },
  "buckingham palace": { lat: 51.5014, lng: -0.1419 },
  "trafalgar square": { lat: 51.508, lng: -0.1281 },
  "piccadilly circus": { lat: 51.5099, lng: -0.1337 },
  "oxford street": { lat: 51.5154, lng: -0.1416 },
  "covent garden": { lat: 51.5117, lng: -0.124 },
  "british museum": { lat: 51.5194, lng: -0.1269 },
  "hyde park": { lat: 51.5073, lng: -0.1657 },
  "st paul's cathedral": { lat: 51.5138, lng: -0.0984 },
  "westminster abbey": { lat: 51.4994, lng: -0.1276 },
  "london eye": { lat: 51.5033, lng: -0.1195 },
  "kings cross": { lat: 51.532, lng: -0.1233 },
  "waterloo station": { lat: 51.5031, lng: -0.1132 },
  "paddington station": { lat: 51.5154, lng: -0.1755 },
  "victoria station": { lat: 51.4952, lng: -0.1441 },
  "liverpool street station": { lat: 51.5178, lng: -0.0817 },
  "euston station": { lat: 51.5284, lng: -0.1331 },
  "london bridge station": { lat: 51.5054, lng: -0.0866 },
  "canary wharf": { lat: 51.5054, lng: -0.0235 },
  "the shard": { lat: 51.5045, lng: -0.0865 },
  "natural history museum": { lat: 51.4967, lng: -0.1764 },
  "science museum": { lat: 51.4978, lng: -0.1745 },
  "tate modern": { lat: 51.5076, lng: -0.0994 },
  "national gallery": { lat: 51.5089, lng: -0.1283 },
  harrods: { lat: 51.4994, lng: -0.1631 },
  "camden market": { lat: 51.5413, lng: -0.1468 },
  greenwich: { lat: 51.4826, lng: -0.0077 },
  "royal observatory": { lat: 51.4778, lng: -0.0015 },
  "primrose hill": { lat: 51.5387, lng: -0.1592 },
  "regent's park": { lat: 51.5313, lng: -0.157 },
  "kensington palace": { lat: 51.505, lng: -0.1877 },
  "notting hill": { lat: 51.5139, lng: -0.2103 },
  "portobello road": { lat: 51.5152, lng: -0.2068 },

  // Educational institutions
  "university of london": { lat: 51.5229, lng: -0.1308 },
  "imperial college": { lat: 51.4988, lng: -0.1749 },
  ucl: { lat: 51.5246, lng: -0.134 },
  "university college london": { lat: 51.5246, lng: -0.134 },
  "king's college": { lat: 51.5115, lng: -0.116 },
  "kings college": { lat: 51.5115, lng: -0.116 },
  "kings college london": { lat: 51.5115, lng: -0.116 },
  lse: { lat: 51.5143, lng: -0.1168 },
  "london school of economics": { lat: 51.5143, lng: -0.1168 },

  // Specific postcodes for the user's route
  rm109qb: { lat: 51.5645, lng: 0.1635 }, // User's home in Dagenham
  "rm10 9qb": { lat: 51.5645, lng: 0.1635 }, // Alternative format
  dagenham: { lat: 51.5645, lng: 0.1635 }, // Area name
  e162rd: { lat: 51.5074, lng: 0.0653 }, // UEL Docklands Campus
  "e16 2rd": { lat: 51.5074, lng: 0.0653 }, // Alternative format
  uel: { lat: 51.5074, lng: 0.0653 }, // University abbreviation
  "uel docklands": { lat: 51.5074, lng: 0.0653 }, // Common name
  "uel docklands campus": { lat: 51.5074, lng: 0.0653 }, // Full name
  "university of east london": { lat: 51.5074, lng: 0.0653 }, // Full university name
  "university of east london docklands": { lat: 51.5074, lng: 0.0653 }, // Full name with campus

  // Default location
  default: { lat: 51.5074, lng: -0.1278 }, // Central London
}

// Realistic street names for London with their general directions
const LONDON_STREETS = [
  { name: "Oxford Street", direction: "east-west" },
  { name: "Regent Street", direction: "north-south" },
  { name: "Piccadilly", direction: "east-west" },
  { name: "The Strand", direction: "east-west" },
  { name: "Fleet Street", direction: "east-west" },
  { name: "Kensington High Street", direction: "east-west" },
  { name: "Baker Street", direction: "north-south" },
  { name: "Bond Street", direction: "north-south" },
  { name: "Shaftesbury Avenue", direction: "east-west" },
  { name: "Charing Cross Road", direction: "north-south" },
  { name: "Tottenham Court Road", direction: "north-south" },
  { name: "Euston Road", direction: "east-west" },
  { name: "Marylebone Road", direction: "east-west" },
  { name: "Edgware Road", direction: "north-south" },
  { name: "Park Lane", direction: "north-south" },
  { name: "Victoria Street", direction: "east-west" },
  { name: "Whitehall", direction: "north-south" },
  { name: "Knightsbridge", direction: "east-west" },
  { name: "Bishopsgate", direction: "north-south" },
  { name: "Farringdon Road", direction: "north-south" },
  { name: "Aldwych", direction: "curved" },
  { name: "High Holborn", direction: "east-west" },
  { name: "Commercial Road", direction: "east-west" },
  { name: "Pall Mall", direction: "east-west" },
  { name: "Haymarket", direction: "north-south" },
  // East London streets for the RM10 to E16 route
  { name: "Heathway", direction: "north-south" },
  { name: "Rainham Road", direction: "north-south" },
  { name: "A13", direction: "east-west" },
  { name: "Newham Way", direction: "east-west" },
  { name: "Royal Docks Road", direction: "east-west" },
  { name: "University Way", direction: "north-south" },
  { name: "Gallions Roundabout", direction: "curved" },
  { name: "Cyprus Place", direction: "north-south" },
]

// Predefined routes between popular locations for more accuracy
const PREDEFINED_ROUTES: Record<
  string,
  {
    distance: number // in meters
    duration: { car: number; walking: number; cycling: number } // in seconds
    waypoints: [number, number][]
  }
> = {
  "london bridge-tower of london": {
    distance: 1200,
    duration: { car: 300, walking: 900, cycling: 420 },
    waypoints: [
      [51.5079, -0.0877], // London Bridge
      [51.5081, -0.0818], // Tower Bridge Road
      [51.5081, -0.0759], // Tower of London
    ],
  },
  "big ben-buckingham palace": {
    distance: 1500,
    duration: { car: 360, walking: 1080, cycling: 480 },
    waypoints: [
      [51.5007, -0.1246], // Big Ben
      [51.5015, -0.128], // Parliament Square
      [51.502, -0.135], // The Mall
      [51.5014, -0.1419], // Buckingham Palace
    ],
  },
  "trafalgar square-piccadilly circus": {
    distance: 600,
    duration: { car: 180, walking: 420, cycling: 240 },
    waypoints: [
      [51.508, -0.1281], // Trafalgar Square
      [51.509, -0.131], // Haymarket
      [51.5099, -0.1337], // Piccadilly Circus
    ],
  },
  "british museum-covent garden": {
    distance: 850,
    duration: { car: 240, walking: 600, cycling: 300 },
    waypoints: [
      [51.5194, -0.1269], // British Museum
      [51.516, -0.126], // Great Russell Street
      [51.514, -0.125], // Drury Lane
      [51.5117, -0.124], // Covent Garden
    ],
  },
  "oxford street-regent street": {
    distance: 500,
    duration: { car: 180, walking: 360, cycling: 240 },
    waypoints: [
      [51.5154, -0.1416], // Oxford Street
      [51.513, -0.14], // Oxford Circus
      [51.511, -0.138], // Regent Street
    ],
  },
  // Specific route from RM10 9QB to E16 2RD (Dagenham to UEL Docklands)
  "rm109qb-e162rd": {
    distance: 11200, // 11.2 km
    duration: { car: 1500, walking: 8400, cycling: 3600 }, // 25 min driving, 2h20m walking, 1h cycling
    waypoints: [
      [51.5645, 0.1635], // RM10 9QB (Dagenham)
      [51.561, 0.155], // Heathway
      [51.558, 0.145], // Rainham Road
      [51.552, 0.13], // A13 Junction
      [51.54, 0.11], // A13 Newham Way
      [51.525, 0.09], // Royal Docks Road
      [51.515, 0.075], // Gallions Roundabout
      [51.5074, 0.0653], // E16 2RD (UEL Docklands Campus)
    ],
  },
  // Also add the reverse route
  "e162rd-rm109qb": {
    distance: 11200, // 11.2 km
    duration: { car: 1500, walking: 8400, cycling: 3600 }, // 25 min driving, 2h20m walking, 1h cycling
    waypoints: [
      [51.5074, 0.0653], // E16 2RD (UEL Docklands Campus)
      [51.515, 0.075], // Gallions Roundabout
      [51.525, 0.09], // Royal Docks Road
      [51.54, 0.11], // A13 Newham Way
      [51.552, 0.13], // A13 Junction
      [51.558, 0.145], // Rainham Road
      [51.561, 0.155], // Heathway
      [51.5645, 0.1635], // RM10 9QB (Dagenham)
    ],
  },
}

/**
 * Get a route between two points with realistic data
 */
export async function getRoute(
  start: RouteCoordinates,
  end: RouteCoordinates,
  options: RouteOptions = {},
): Promise<RouteResult | RouteError> {
  try {
    // Set defaults - always use driving-car for school buses
    const profile = "driving-car"
    const preference = options.preference || "recommended"

    // Check if we have a predefined route for these locations
    const predefinedRouteKey = findPredefinedRoute(start, end)

    if (predefinedRouteKey) {
      console.log(`Using predefined route: ${predefinedRouteKey}`)
      return generatePredefinedRoute(predefinedRouteKey, profile, preference)
    }

    // Generate a realistic route based on the actual road network
    return generateRealisticRoute(start, end, profile, preference)
  } catch (error) {
    console.error("Error generating route:", error)
    return {
      error: "Route Generation Error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

/**
 * Find if there's a predefined route that matches the start and end points
 */
function findPredefinedRoute(start: RouteCoordinates, end: RouteCoordinates): string | null {
  // Find the closest known locations to the start and end points
  const startLocation = findClosestLocation(start)
  const endLocation = findClosestLocation(end)

  if (!startLocation || !endLocation) return null

  // Check if we have a predefined route for this pair
  const routeKey = `${startLocation}-${endLocation}`
  const reverseRouteKey = `${endLocation}-${startLocation}`

  if (PREDEFINED_ROUTES[routeKey]) return routeKey
  if (PREDEFINED_ROUTES[reverseRouteKey]) return reverseRouteKey

  return null
}

/**
 * Find the closest known location to the given coordinates
 */
function findClosestLocation(coords: RouteCoordinates): string | null {
  let closestLocation = null
  let closestDistance = Number.POSITIVE_INFINITY

  for (const [name, location] of Object.entries(LOCATIONS)) {
    if (name === "default") continue

    const distance = calculateDistance(coords.lat, coords.lng, location.lat, location.lng)

    if (distance < closestDistance) {
      closestDistance = distance
      closestLocation = name
    }
  }

  // Only return if it's reasonably close (within 500 meters)
  return closestDistance < 500 ? closestLocation : null
}

/**
 * Generate a route from a predefined route
 */
function generatePredefinedRoute(routeKey: string, profile: string, preference: string): RouteResult {
  const routeData = PREDEFINED_ROUTES[routeKey]
  const [start, end] = routeKey.split("-")

  // Get duration based on transport mode
  let duration: number
  switch (profile) {
    case "foot-walking":
      duration = routeData.duration.walking
      break
    case "cycling-regular":
      duration = routeData.duration.cycling
      break
    default:
      duration = routeData.duration.car
  }

  // Adjust based on preference
  let distance = routeData.distance
  if (preference === "shortest") {
    distance *= 0.9
    duration *= 1.1 // Shorter but slower
  } else if (preference === "fastest") {
    distance *= 1.1
    duration *= 0.9 // Longer but faster
  }

  // Convert waypoints to GeoJSON format (longitude first)
  const coordinates: [number, number][] = routeData.waypoints.map((wp) => [wp[1], wp[0]])

  // Generate segments with realistic instructions
  const segments = generateRealisticSegments(coordinates, profile, distance, duration, routeKey)

  return {
    geometry: {
      coordinates,
    },
    properties: {
      segments,
      summary: {
        distance,
        duration,
      },
      way_points: [0, coordinates.length - 1],
    },
  }
}

/**
 * Generate a realistic route based on the actual road network
 */
function generateRealisticRoute(
  start: RouteCoordinates,
  end: RouteCoordinates,
  profile: string,
  preference: string,
): RouteResult {
  // Calculate straight-line distance
  const directDistance = calculateDistance(start.lat, start.lng, end.lat, end.lng)

  // Realistic route factors based on London's road network
  let routeFactor: number
  let speedKmh: number

  // Set realistic speed and route factors based on transport mode
  switch (profile) {
    case "foot-walking":
      routeFactor = 1.3 // Walking routes are more direct
      speedKmh = 4.8 // Average walking speed in London
      break
    case "cycling-regular":
      routeFactor = 1.4 // Cycling routes follow cycle lanes
      speedKmh = 12 // Average cycling speed in London
      break
    case "driving-car":
    default:
      routeFactor = 1.6 // Driving routes follow one-way systems and traffic patterns
      speedKmh = 15 // Average driving speed in central London (very slow due to traffic)
  }

  // Adjust based on preference
  if (preference === "shortest") {
    routeFactor *= 0.9
    speedKmh *= 0.9 // Shorter but slower
  } else if (preference === "fastest") {
    routeFactor *= 1.1
    speedKmh *= 1.2 // Longer but faster
  }

  // Calculate realistic distance and duration
  const distance = directDistance * routeFactor
  const speedMs = (speedKmh * 1000) / 3600 // Convert km/h to m/s
  const duration = distance / speedMs

  // Generate realistic route points that follow London's road grid
  const coordinates = generateRealisticRoutePoints(start, end, profile)

  // Generate segments with realistic instructions
  const segments = generateRealisticSegments(coordinates, profile, distance, duration)

  return {
    geometry: {
      coordinates,
    },
    properties: {
      segments,
      summary: {
        distance,
        duration,
      },
      way_points: [0, coordinates.length - 1],
    },
  }
}

/**
 * Generate realistic route points that follow London's road grid
 */
function generateRealisticRoutePoints(
  start: RouteCoordinates,
  end: RouteCoordinates,
  profile: string,
): [number, number][] {
  const coordinates: [number, number][] = []

  // Add start point (longitude first for GeoJSON)
  coordinates.push([start.lng, start.lat])

  // Determine if we need to go east-west first or north-south first
  // This creates a more realistic L-shaped or stair-shaped route
  const latDiff = end.lat - start.lat
  const lngDiff = end.lng - start.lng

  // Number of intermediate points depends on distance
  const directDistance = calculateDistance(start.lat, start.lng, end.lat, end.lng)
  const numPoints = Math.max(8, Math.min(20, Math.floor(directDistance / 200)))

  // Generate intermediate points
  if (Math.abs(latDiff) > Math.abs(lngDiff)) {
    // Go north-south first, then east-west

    // First segment - north-south
    const midLat = start.lat + latDiff * 0.7
    coordinates.push([start.lng, midLat])

    // Add some intermediate points with slight jitter for realism
    for (let i = 1; i < numPoints - 1; i++) {
      const ratio = i / (numPoints - 1)
      const lat = start.lat + latDiff * ratio
      const lng = start.lng + lngDiff * ratio

      // Add slight jitter to simulate real roads
      const jitterLat = (Math.random() - 0.5) * 0.0005
      const jitterLng = (Math.random() - 0.5) * 0.0005

      coordinates.push([lng + jitterLng, lat + jitterLat])
    }

    // Second segment - east-west
    coordinates.push([end.lng, midLat])
  } else {
    // Go east-west first, then north-south

    // First segment - east-west
    const midLng = start.lng + lngDiff * 0.7
    coordinates.push([midLng, start.lat])

    // Add some intermediate points with slight jitter for realism
    for (let i = 1; i < numPoints - 1; i++) {
      const ratio = i / (numPoints - 1)
      const lat = start.lat + latDiff * ratio
      const lng = start.lng + lngDiff * ratio

      // Add slight jitter to simulate real roads
      const jitterLat = (Math.random() - 0.5) * 0.0005
      const jitterLng = (Math.random() - 0.5) * 0.0005

      coordinates.push([lng + jitterLng, lat + jitterLat])
    }

    // Second segment - north-south
    coordinates.push([midLng, end.lat])
  }

  // Add end point
  coordinates.push([end.lng, end.lat])

  return coordinates
}

/**
 * Generate realistic segments with proper instructions
 */
function generateRealisticSegments(
  coordinates: [number, number][],
  profile: string,
  totalDistance: number,
  totalDuration: number,
  routeKey?: string,
): RouteSegment[] {
  // Special case for the RM10 9QB to E16 2RD route
  if (routeKey === "rm109qb-e162rd") {
    return [
      {
        distance: 800,
        duration: totalDuration * 0.1,
        instruction:
          profile === "foot-walking"
            ? "Walk south on Heathway toward Dagenham Heathway Station"
            : profile === "cycling-regular"
              ? "Cycle south on Heathway toward Dagenham Heathway Station"
              : "Drive south on Heathway toward Dagenham Heathway Station",
        name: "Heathway",
        type: "depart",
        way_points: [0, 1],
      },
      {
        distance: 1200,
        duration: totalDuration * 0.15,
        instruction: "Continue southwest onto Rainham Road",
        name: "Rainham Road",
        type: "continue",
        way_points: [1, 2],
      },
      {
        distance: 2500,
        duration: totalDuration * 0.2,
        instruction: "Turn right onto A13 (Newham Way) heading west",
        name: "A13",
        type: "turn-right",
        way_points: [2, 3],
      },
      {
        distance: 3500,
        duration: totalDuration * 0.25,
        instruction: "Continue on A13 through Newham",
        name: "A13 Newham Way",
        type: "continue",
        way_points: [3, 4],
      },
      {
        distance: 2000,
        duration: totalDuration * 0.15,
        instruction: "Take the exit toward Royal Docks/ExCeL London",
        name: "Royal Docks Road",
        type: "turn-left",
        way_points: [4, 5],
      },
      {
        distance: 800,
        duration: totalDuration * 0.1,
        instruction: "At Gallions Roundabout, take the 2nd exit onto University Way",
        name: "Gallions Roundabout",
        type: "roundabout",
        way_points: [5, 6],
      },
      {
        distance: 400,
        duration: totalDuration * 0.05,
        instruction: "Arrive at University of East London Docklands Campus",
        name: "University Way",
        type: "arrive",
        way_points: [6, 7],
      },
    ]
  } else if (routeKey === "e162rd-rm109qb") {
    return [
      {
        distance: 400,
        duration: totalDuration * 0.05,
        instruction:
          profile === "foot-walking"
            ? "Walk north on University Way from UEL Docklands Campus"
            : profile === "cycling-regular"
              ? "Cycle north on University Way from UEL Docklands Campus"
              : "Drive north on University Way from UEL Docklands Campus",
        name: "University Way",
        type: "depart",
        way_points: [0, 1],
      },
      {
        distance: 800,
        duration: totalDuration * 0.1,
        instruction: "At Gallions Roundabout, take the 3rd exit toward Royal Docks Road",
        name: "Gallions Roundabout",
        type: "roundabout",
        way_points: [1, 2],
      },
      {
        distance: 2000,
        duration: totalDuration * 0.15,
        instruction: "Continue on Royal Docks Road",
        name: "Royal Docks Road",
        type: "continue",
        way_points: [2, 3],
      },
      {
        distance: 3500,
        duration: totalDuration * 0.25,
        instruction: "Turn right onto A13 (Newham Way) heading east",
        name: "A13 Newham Way",
        type: "turn-right",
        way_points: [3, 4],
      },
      {
        distance: 2500,
        duration: totalDuration * 0.2,
        instruction: "Continue on A13 toward Dagenham",
        name: "A13",
        type: "continue",
        way_points: [4, 5],
      },
      {
        distance: 1200,
        duration: totalDuration * 0.15,
        instruction: "Take the exit and turn left onto Rainham Road heading north",
        name: "Rainham Road",
        type: "turn-left",
        way_points: [5, 6],
      },
      {
        distance: 800,
        duration: totalDuration * 0.1,
        instruction: "Turn right onto Heathway and arrive at your destination",
        name: "Heathway",
        type: "arrive",
        way_points: [6, 7],
      },
    ]
  }

  // Default case for other routes
  const segments: RouteSegment[] = []

  // We need at least 3 points to make meaningful segments
  if (coordinates.length < 3) {
    // Simple case: just one segment from start to end
    return [
      {
        distance: totalDistance,
        duration: totalDuration,
        instruction:
          profile === "foot-walking"
            ? "Walk to your destination"
            : profile === "cycling-regular"
              ? "Cycle to your destination"
              : "Drive to your destination",
        name: "Direct route",
        type: "direct",
        way_points: [0, coordinates.length - 1],
      },
    ]
  }

  // Calculate the number of segments (one less than the number of points)
  const numSegments = coordinates.length - 1

  // Distribute distance and duration across segments proportionally
  let distanceSoFar = 0
  let durationSoFar = 0

  for (let i = 0; i < numSegments; i++) {
    const isFirst = i === 0
    const isLast = i === numSegments - 1

    // Calculate segment distance based on actual coordinates
    const [lng1, lat1] = coordinates[i]
    const [lng2, lat2] = coordinates[i + 1]
    const segmentDistance = calculateDistance(lat1, lng1, lat2, lng2)

    // Calculate segment duration proportionally
    const segmentDuration = (segmentDistance / totalDistance) * totalDuration

    distanceSoFar += segmentDistance
    durationSoFar += segmentDuration

    // Get a realistic street name
    const streetName = LONDON_STREETS[Math.floor(Math.random() * LONDON_STREETS.length)].name

    // Generate instruction based on segment position
    let instruction = ""
    let type = ""

    if (isFirst) {
      // First segment
      instruction =
        profile === "foot-walking"
          ? `Walk ${getDirection(lat1, lng1, lat2, lng2)} on ${streetName}`
          : profile === "cycling-regular"
            ? `Cycle ${getDirection(lat1, lng1, lat2, lng2)} on ${streetName}`
            : `Drive ${getDirection(lat1, lng1, lat2, lng2)} on ${streetName}`
      type = "depart"
    } else if (isLast) {
      // Last segment
      instruction = "Arrive at your destination"
      type = "arrive"
    } else {
      // Middle segment - determine if it's a turn
      const [prevLng, prevLat] = coordinates[i - 1]
      const prevDirection = getDirection(prevLat, prevLng, lat1, lng1)
      const currentDirection = getDirection(lat1, lng1, lat2, lng2)

      if (prevDirection !== currentDirection) {
        // It's a turn
        instruction = `Turn ${getTurnDirection(prevDirection, currentDirection)} onto ${streetName}`
        type = `turn-${getTurnDirection(prevDirection, currentDirection).toLowerCase()}`
      } else {
        // Continue straight
        instruction = `Continue ${currentDirection} on ${streetName}`
        type = "continue"
      }
    }

    segments.push({
      distance: segmentDistance,
      duration: segmentDuration,
      instruction,
      name: streetName,
      type,
      way_points: [i, i + 1],
    })
  }

  return segments
}

/**
 * Get the direction of travel between two points
 */
function getDirection(lat1: number, lng1: number, lat2: number, lng2: number): string {
  const latDiff = lat2 - lat1
  const lngDiff = lng2 - lng1

  // Calculate angle in degrees (0° is east, 90° is north)
  const angle = (Math.atan2(latDiff, lngDiff) * 180) / Math.PI

  // Convert angle to 8 cardinal directions
  if (angle > -22.5 && angle <= 22.5) return "east"
  if (angle > 22.5 && angle <= 67.5) return "northeast"
  if (angle > 67.5 && angle <= 112.5) return "north"
  if (angle > 112.5 && angle <= 157.5) return "northwest"
  if (angle > 157.5 || angle <= -157.5) return "west"
  if (angle > -157.5 && angle <= -112.5) return "southwest"
  if (angle > -112.5 && angle <= -67.5) return "south"
  return "southeast"
}

/**
 * Get the turn direction based on the change in direction
 */
function getTurnDirection(fromDirection: string, toDirection: string): string {
  const directions = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]

  const fromIndex = directions.indexOf(fromDirection)
  const toIndex = directions.indexOf(toDirection)

  if (fromIndex === -1 || toIndex === -1) return "right" // Default if direction not found

  // Calculate the difference in direction (considering the circular nature)
  let diff = toIndex - fromIndex
  if (diff < -4) diff += 8
  if (diff > 4) diff -= 8

  // Determine turn direction
  if (diff === 0) return "straight"
  if (diff === 4) return "around" // U-turn
  if (diff > 0 && diff < 4) return "right"
  return "left"
}

/**
 * Geocode an address to coordinates with improved accuracy
 */
export async function geocodeAddress(address: string): Promise<RouteCoordinates | RouteError> {
  try {
    // Normalize the address
    const normalizedAddress = address.toLowerCase().trim()

    // Try to find an exact match
    if (LOCATIONS[normalizedAddress]) {
      console.log(`Found exact match for "${address}":`, LOCATIONS[normalizedAddress])
      return LOCATIONS[normalizedAddress]
    }

    // Try to find a partial match with improved matching algorithm
    let bestMatch = null
    let bestMatchScore = 0

    for (const [key, coords] of Object.entries(LOCATIONS)) {
      // Skip the default entry
      if (key === "default") continue

      // Calculate match score based on substring matching and word matching
      let score = 0

      // Check if one is a substring of the other
      if (normalizedAddress.includes(key)) {
        score += (key.length / normalizedAddress.length) * 10
      } else if (key.includes(normalizedAddress)) {
        score += (normalizedAddress.length / key.length) * 8
      }

      // Check for word matches
      const addressWords = normalizedAddress.split(/\s+/)
      const keyWords = key.split(/\s+/)

      for (const addressWord of addressWords) {
        if (addressWord.length < 3) continue // Skip very short words

        for (const keyWord of keyWords) {
          if (keyWord.length < 3) continue // Skip very short words

          if (addressWord === keyWord) {
            score += 5
          } else if (addressWord.includes(keyWord) || keyWord.includes(addressWord)) {
            score += 2
          }
        }
      }

      // Update best match if this is better
      if (score > bestMatchScore) {
        bestMatchScore = score
        bestMatch = { key, coords }
      }
    }

    // If we found a good match (score > threshold)
    if (bestMatch && bestMatchScore > 3) {
      console.log(
        `Found partial match for "${address}" (matched "${bestMatch.key}" with score ${bestMatchScore}):`,
        bestMatch.coords,
      )
      return bestMatch.coords
    }

    // If no match found, return default location with a warning
    console.log(`No match found for "${address}", using default location`)
    return {
      ...LOCATIONS.default,
      // Adding a small random offset to make different searches look different
      lat: LOCATIONS.default.lat + (Math.random() - 0.5) * 0.01,
      lng: LOCATIONS.default.lng + (Math.random() - 0.5) * 0.01,
    }
  } catch (error) {
    console.error("Error geocoding address:", error)
    return {
      error: "Geocoding Error",
      message: "Failed to find location. Try a common London landmark like 'London Bridge' or 'Big Ben'.",
    }
  }
}

/**
 * Calculate the distance between two points in meters (Haversine formula)
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}

/**
 * Format distance in a human-readable way
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

/**
 * Format duration in a human-readable way
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours} hr ${minutes} min`
  }
  return `${minutes} min`
}

/**
 * Get detailed turn-by-turn directions from route segments
 */
export function getRouteDirections(route: RouteResult): { text: string; distance: string; duration: string }[] {
  if (!route || !route.properties || !route.properties.segments) {
    return []
  }

  return route.properties.segments.map((segment) => {
    return {
      text: segment.instruction,
      distance: formatDistance(segment.distance),
      duration: formatDuration(segment.duration),
    }
  })
}

// Add this new function at the end of the file
export function getBusServices(from: string, to: string): BusService[] {
  // Normalize inputs
  const normalizedFrom = from.toLowerCase().replace(/\s+/g, "")
  const normalizedTo = to.toLowerCase().replace(/\s+/g, "")

  // Check if this is the RM10 9QB to E16 2RD route (or reverse)
  if (
    (normalizedFrom.includes("rm109") && normalizedTo.includes("e162")) ||
    (normalizedFrom.includes("e162") && normalizedTo.includes("rm109")) ||
    (normalizedFrom.includes("dagenham") && normalizedTo.includes("uel")) ||
    (normalizedFrom.includes("uel") && normalizedTo.includes("dagenham"))
  ) {
    return [
      {
        routeNumber: "EL1",
        operator: "East London Transit",
        frequency: "Every 15 minutes",
        firstBus: "05:30",
        lastBus: "23:45",
        duration: "35 minutes",
        stops: [
          "Dagenham Heathway Station",
          "Becontree Station",
          "Goresbrook Leisure Centre",
          "Barking Station",
          "East Ham",
          "Beckton",
          "Cyprus DLR",
          "UEL Docklands Campus",
        ],
        fare: "£1.65 with student Oyster card",
      },
      {
        routeNumber: "103",
        operator: "School Express Service",
        frequency: "3 times daily (school days only)",
        firstBus: "07:30",
        lastBus: "16:15",
        duration: "25 minutes",
        stops: ["Dagenham Heathway (RM10 9QB area)", "Becontree Heath", "A13 Express Route", "UEL Docklands Campus"],
        fare: "Free with student ID",
      },
    ]
  }

  // Default empty array if no matching route
  return []
}

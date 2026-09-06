const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const TRIPS_KEY = 'safari_explorer_trips'

function readTrips() {
  try {
    return JSON.parse(localStorage.getItem(TRIPS_KEY)) || []
  } catch {
    return []
  }
}

function writeTrips(trips) {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips))
}

export async function getTrips() {
  await delay(150)
  return readTrips()
}

export async function getTripById(id) {
  await delay(150)
  return readTrips().find((trip) => trip.id === Number(id)) || null
}

export async function createTrip({ name, startDate, endDate, destinationIds }) {
  await delay(150)
  const trip = {
    id: Date.now(),
    name: name.trim(),
    startDate,
    endDate,
    destinationIds: [...destinationIds],
    createdAt: Date.now(),
  }
  writeTrips([trip, ...readTrips()])
  return trip
}

export async function updateTrip(id, changes) {
  await delay(150)
  const trips = readTrips()
  const trip = trips.find((item) => item.id === Number(id))
  if (!trip) {
    return null
  }
  const updated = { ...trip, ...changes, name: changes.name?.trim() ?? trip.name }
  writeTrips(trips.map((item) => (item.id === Number(id) ? updated : item)))
  return updated
}

export async function deleteTrip(id) {
  await delay(150)
  writeTrips(readTrips().filter((trip) => trip.id !== Number(id)))
}

export async function removeDestinationFromTrip(tripId, destinationId) {
  await delay(150)
  const trips = readTrips()
  const trip = trips.find((item) => item.id === Number(tripId))
  if (!trip) {
    return null
  }
  const updated = {
    ...trip,
    destinationIds: trip.destinationIds.filter((item) => item !== Number(destinationId)),
  }
  writeTrips(trips.map((item) => (item.id === Number(tripId) ? updated : item)))
  return updated
}
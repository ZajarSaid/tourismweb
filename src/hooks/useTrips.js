import { useCallback, useEffect, useState } from 'react'
import {
  createTrip as apiCreateTrip,
  deleteTrip as apiDeleteTrip,
  removeDestinationFromTrip as apiRemoveDestinationFromTrip,
  updateTrip as apiUpdateTrip,
} from '../services/tripService.js'

const STORAGE_KEY = 'safari_explorer_trips'
const CHANGE_EVENT = 'safari-trips-change'

function readTrips() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function useTrips() {
  const [trips, setTrips] = useState(readTrips)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [trips])

  useEffect(() => {
    const sync = () => setTrips(readTrips())
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const createTrip = useCallback(async (data) => {
    const trip = await apiCreateTrip(data)
    setTrips((current) => [trip, ...current.filter((item) => item.id !== trip.id)])
    return trip
  }, [])

  const updateTrip = useCallback(async (id, changes) => {
    const trip = await apiUpdateTrip(id, changes)
    if (trip) {
      setTrips((current) =>
        current.map((item) => (item.id === trip.id ? trip : item)),
      )
    }
    return trip
  }, [])

  const deleteTrip = useCallback(async (id) => {
    await apiDeleteTrip(id)
    setTrips((current) => current.filter((trip) => trip.id !== Number(id)))
  }, [])

  const removeDestinationFromTrip = useCallback(async (tripId, destinationId) => {
    const trip = await apiRemoveDestinationFromTrip(tripId, destinationId)
    if (trip) {
      setTrips((current) =>
        current.map((item) => (item.id === trip.id ? trip : item)),
      )
    }
    return trip
  }, [])

  return {
    trips,
    createTrip,
    updateTrip,
    deleteTrip,
    removeDestinationFromTrip,
  }
}
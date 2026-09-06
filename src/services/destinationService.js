import { destinations } from '../data/destinations.js'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getAllDestinations() {
  await delay(300)
  return [...destinations]
}

export async function getFeaturedDestinations() {
  await delay(300)
  return destinations.filter((destination) => destination.featured)
}

export async function getDestinationById(id) {
  await delay(300)
  return destinations.find((destination) => destination.id === Number(id)) || null
}
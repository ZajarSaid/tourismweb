import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'safari_explorer_favorites'
const CHANGE_EVENT = 'safari-favorites-change'

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    const json = JSON.stringify(favorites)
    if (localStorage.getItem(STORAGE_KEY) === json) {
      return
    }
    localStorage.setItem(STORAGE_KEY, json)
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [favorites])

  useEffect(() => {
    const sync = () => {
      setFavorites((current) => {
        const next = readFavorites()
        return JSON.stringify(current) === JSON.stringify(next) ? current : next
      })
    }
    window.addEventListener(CHANGE_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const isFavorite = useCallback(
    (id) => favorites.some((favorite) => favorite.id === Number(id)),
    [favorites],
  )

  const addFavorite = useCallback((destination) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === destination.id)
        ? current
        : [...current, destination],
    )
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.filter((favorite) => favorite.id !== Number(id)),
    )
  }, [])

  const toggleFavorite = useCallback((destination) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === destination.id)
        ? current.filter((favorite) => favorite.id !== destination.id)
        : [...current, destination],
    )
  }, [])

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite }
}
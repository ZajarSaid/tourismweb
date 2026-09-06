import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DestinationCard from '../components/destinations/DestinationCard.jsx'
import Message from '../components/common/Message.jsx'
import { getAllDestinations } from '../services/destinationService.js'
import { REGIONS, TOURISM_TYPES } from '../data/destinations.js'
import '../components/destinations/destinations.css'

function DestinationsPage() {
  const [searchParams] = useSearchParams()
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [type, setType] = useState(() => {
    const param = searchParams.get('type')
    return TOURISM_TYPES.includes(param) ? param : 'All'
  })

  useEffect(() => {
    let active = true
    getAllDestinations()
      .then((data) => {
        if (active) {
          setDestinations(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (active) {
          setError(true)
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase()
    return destinations.filter((destination) => {
      const matchesSearch =
        !query || destination.name.toLowerCase().includes(query)
      const matchesRegion = region === 'All' || destination.region === region
      const matchesType = type === 'All' || destination.type === type
      return matchesSearch && matchesRegion && matchesType
    })
  }, [destinations, search, region, type])

  return (
    <section className="page">
      <div className="container">
        <header className="destinations__header">
          <h1 className="page__title">Discover Tanzania</h1>
          <p className="page__text">
            Search and filter destinations across Tanzania - from wildlife
            safaris to tropical beaches.
          </p>
        </header>

        <div className="filters">
          <label className="filter-group">
            <span className="filter-group__label">Search</span>
            <input
              type="search"
              className="filters__search"
              placeholder="Search destinations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <fieldset className="filter-group">
            <legend className="filter-group__label">Region</legend>
            <div className="filter-options">
              {['All', ...REGIONS].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-chip ${region === option ? 'filter-chip--active' : ''}`}
                  aria-pressed={region === option}
                  onClick={() => setRegion(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-group">
            <legend className="filter-group__label">Type</legend>
            <div className="filter-options">
              {['All', ...TOURISM_TYPES].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-chip ${type === option ? 'filter-chip--active' : ''}`}
                  aria-pressed={type === option}
                  onClick={() => setType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {loading && <Message variant="info">Loading destinations...</Message>}

        {!loading && error && (
          <Message variant="error">
            Something went wrong. Please try again.
          </Message>
        )}

        {!loading && !error && filteredDestinations.length === 0 && (
          <Message variant="info" title="No destinations found.">
            Try adjusting your search or filters.
          </Message>
        )}

        {!loading && !error && filteredDestinations.length > 0 && (
          <div className="destinations-grid">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default DestinationsPage
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/common/Rating.jsx'
import FavoriteButton from '../components/common/FavoriteButton.jsx'
import Message from '../components/common/Message.jsx'
import { getDestinationById } from '../services/destinationService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import '../components/destinations/destinations.css'

function DestinationDetailsPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    getDestinationById(id)
      .then((data) => {
        if (active) {
          setDestination(data)
          setLoading(false)
          setError(false)
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
  }, [id])

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <Message variant="info">Loading destination...</Message>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <div className="container">
          <Message variant="error">
            Something went wrong. Please try again.
          </Message>
        </div>
      </section>
    )
  }

  if (!destination) {
    return (
      <section className="page">
        <div className="container">
          <Message variant="info" title="Destination not found.">
            The destination you are looking for does not exist.
          </Message>
          <p className="detail__not-found-action">
            <Link to="/destinations" className="button">
              Back to Destinations
            </Link>
          </p>
        </div>
      </section>
    )
  }

  const handleAddToTrip = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    navigate(`/my-trips/new?destination=${destination.id}`)
  }

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    toggleFavorite(destination)
  }

  return (
    <section className="page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/destinations" className="breadcrumb__link">
            Destinations
          </Link>
          <span className="breadcrumb__separator" aria-hidden="true">
            /
          </span>
          <span className="breadcrumb__current">{destination.name}</span>
        </nav>

        <img
          className="detail__image"
          src={destination.images[0]}
          alt={destination.name}
        />

        <h1 className="detail__title">{destination.name}</h1>

        <div className="detail__meta">
          <p className="detail__location">{destination.location}</p>
          <Rating
            rating={destination.rating}
            reviewCount={destination.reviewCount}
          />
        </div>

        <p className="detail__description">{destination.description}</p>

        <div className="detail__grid">
          <div className="detail__section">
            <h2 className="detail__section-title">Key Information</h2>
            <dl>
              <div className="detail__section-row">
                <dt>Region</dt>
                <dd>{destination.region}</dd>
              </div>
              <div className="detail__section-row">
                <dt>Tourism Type</dt>
                <dd>{destination.type}</dd>
              </div>
              <div className="detail__section-row">
                <dt>Best Time to Visit</dt>
                <dd>{destination.bestTimeToVisit}</dd>
              </div>
              <div className="detail__section-row">
                <dt>Estimated Cost</dt>
                <dd>${destination.pricePerDay} / day</dd>
              </div>
            </dl>
          </div>

          <div className="detail__section">
            <h2 className="detail__section-title">Available Experiences</h2>
            <ul className="detail__experiences">
              {destination.experiences.map((experience) => (
                <li key={experience}>{experience}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail__actions">
          <button
            type="button"
            className="button"
            onClick={handleAddToTrip}
          >
            Add to My Trip
          </button>
          <FavoriteButton
            favorite={user ? isFavorite(destination.id) : false}
            onToggle={handleToggleFavorite}
          />
        </div>
      </div>
    </section>
  )
}

export default DestinationDetailsPage
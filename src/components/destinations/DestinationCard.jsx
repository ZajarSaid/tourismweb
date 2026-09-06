import { Link, useLocation, useNavigate } from 'react-router-dom'
import Rating from '../common/Rating.jsx'
import FavoriteButton from '../common/FavoriteButton.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useFavorites } from '../../hooks/useFavorites.js'

function DestinationCard({ destination }) {
  const { user } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()

  const handleToggleFavorite = () => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname + location.search } })
      return
    }
    toggleFavorite(destination)
  }

  return (
    <article className="destination-card">
      <Link
        to={`/destinations/${destination.id}`}
        className="destination-card__image-link"
        aria-label={destination.name}
      >
        <img
          className="destination-card__image"
          src={destination.images[0]}
          alt={destination.name}
          loading="lazy"
        />
      </Link>
      <div className="destination-card__body">
        <div className="destination-card__top">
          <span className="destination-card__type">{destination.type}</span>
          <Rating rating={destination.rating} reviewCount={destination.reviewCount} />
        </div>
        <h3 className="destination-card__title">
          <Link to={`/destinations/${destination.id}`}>
            {destination.name}
          </Link>
        </h3>
        <p className="destination-card__location">{destination.location}</p>
        <p className="destination-card__description">
          {destination.description}
        </p>
        <div className="destination-card__footer">
          <Link
            to={`/destinations/${destination.id}`}
            className="button button--small"
          >
            View Details
          </Link>
          <FavoriteButton
            favorite={user ? isFavorite(destination.id) : false}
            onToggle={handleToggleFavorite}
          />
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
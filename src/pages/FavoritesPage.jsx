import { Link } from 'react-router-dom'
import DestinationCard from '../components/destinations/DestinationCard.jsx'
import Message from '../components/common/Message.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import '../components/destinations/destinations.css'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="page">
      <div className="container">
        <header className="destinations__header">
          <h1 className="page__title">My Favorites</h1>
          <p className="page__text">
            Your saved destinations, ready for your next Tanzania adventure.
          </p>
        </header>

        {favorites.length === 0 ? (
          <>
            <Message variant="info" title="No favorites yet.">
              Tap the heart on any destination to save it here.
            </Message>
            <p className="detail__not-found-action">
              <Link to="/destinations" className="button">
                Explore Destinations
              </Link>
            </p>
          </>
        ) : (
          <div className="destinations-grid">
            {favorites.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FavoritesPage
import { Link } from 'react-router-dom'
import TripCard from '../components/trips/TripCard.jsx'
import Message from '../components/common/Message.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { useTrips } from '../hooks/useTrips.js'
import '../components/trips/trips.css'

function DashboardPage() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const { trips } = useTrips()

  const recentTrips = trips.slice(0, 3)

  return (
    <section className="page">
      <div className="container">
        <div className="dashboard__welcome">
          <h1 className="page__title">Welcome back{user ? `, ${user.name}` : ''}!</h1>
          <p className="page__text">
            Here is a quick overview of your travel plans.
          </p>
        </div>

        <div className="dashboard__stats">
          <Link to="/my-trips" className="dashboard-stat">
            <div>
              <p className="dashboard-stat__label">My Trips</p>
              <p className="dashboard-stat__value">{trips.length}</p>
              <p className="dashboard-stat__label">
                {trips.length === 1 ? 'Trip' : 'Trips'} planned
              </p>
            </div>
          </Link>

          <Link to="/favorites" className="dashboard-stat">
            <div>
              <p className="dashboard-stat__label">Favorites</p>
              <p className="dashboard-stat__value">{favorites.length}</p>
              <p className="dashboard-stat__label">
                {favorites.length === 1 ? 'Destination' : 'Destinations'} saved
              </p>
            </div>
          </Link>
        </div>

        <h2 className="dashboard__section-title">Recent Trips</h2>
        {recentTrips.length === 0 ? (
          <Message variant="info" title="No trips yet.">
            Create a trip to start planning your Tanzania adventure.
          </Message>
        ) : (
          <div className="dashboard__recent">
            {recentTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        <div className="dashboard__links">
          <Link to="/my-trips" className="button button--secondary">
            My Trips
          </Link>
          <Link to="/favorites" className="button button--secondary">
            Favorites
          </Link>
          <Link to="/profile" className="button button--secondary">
            Profile
          </Link>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
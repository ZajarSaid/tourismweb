import { Link } from 'react-router-dom'
import TripCard from '../components/trips/TripCard.jsx'
import Message from '../components/common/Message.jsx'
import { useTrips } from '../hooks/useTrips.js'
import '../components/trips/trips.css'

function MyTripsPage() {
  const { trips, deleteTrip } = useTrips()

  const handleDelete = async (trip) => {
    const confirmed = window.confirm(
      `Delete "${trip.name}"? This cannot be undone.`,
    )
    if (confirmed) {
      await deleteTrip(trip.id)
    }
  }

  return (
    <section className="page">
      <div className="container">
        <header className="trips__header">
          <h1 className="page__title">My Trips</h1>
          <p className="page__text">
            Plan and manage the Tanzania adventures you want to take.
          </p>
          <Link to="/my-trips/new" className="button">
            New Trip
          </Link>
        </header>

        {trips.length === 0 ? (
          <Message variant="info" title="No trips yet.">
            Create your first trip to start planning your adventure.
          </Message>
        ) : (
          <div className="trips-list">
            {trips.map((trip) => (
              <div key={trip.id} className="trips-list__item">
                <TripCard trip={trip} />
                <button
                  type="button"
                  className="button button--small button--danger"
                  onClick={() => handleDelete(trip)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MyTripsPage
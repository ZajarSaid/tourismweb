import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/common/Message.jsx'
import { getAllDestinations } from '../services/destinationService.js'
import { useTrips } from '../hooks/useTrips.js'
import { formatTripDates } from '../utils/date.js'
import '../components/trips/trips.css'

function TripDetailsPage() {
  const { id } = useParams()
  const { trips, removeDestinationFromTrip } = useTrips()
  const [destinations, setDestinations] = useState([])
  const [removing, setRemoving] = useState(false)

  useEffect(() => {
    let active = true
    getAllDestinations()
      .then((data) => {
        if (active) {
          setDestinations(data)
        }
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const trip = trips.find((item) => item.id === Number(id))

  const handleRemove = async (destinationId) => {
    setRemoving(true)
    await removeDestinationFromTrip(trip.id, destinationId)
    setRemoving(false)
  }

  return (
    <section className="page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/my-trips" className="breadcrumb__link">
            My Trips
          </Link>
          <span className="breadcrumb__separator" aria-hidden="true">
            /
          </span>
          <span className="breadcrumb__current">
            {trip ? trip.name : 'Trip'}
          </span>
        </nav>

        {!trip ? (
          <>
            <Message variant="info" title="Trip not found.">
              The trip you are looking for does not exist.
            </Message>
            <p className="detail__not-found-action">
              <Link to="/my-trips" className="button">
                Back to My Trips
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="page__title">{trip.name}</h1>
            <p className="page__text">
              {formatTripDates(trip.startDate, trip.endDate)} •{' '}
              {trip.destinationIds.length} destination
              {trip.destinationIds.length === 1 ? '' : 's'}
            </p>

            <div className="trip-details__actions">
              <Link to={`/my-trips/${trip.id}/edit`} className="button">
                Edit Trip
              </Link>
              <Link to="/my-trips/new" className="button button--secondary">
                New Trip
              </Link>
            </div>

            <h2 className="dashboard__section-title">Destinations</h2>
            {trip.destinationIds.length === 0 ? (
              <Message variant="info" title="No destinations yet.">
                Edit this trip to add destinations.
              </Message>
            ) : (
              <div className="trip-details__list">
                {trip.destinationIds.map((destinationId) => {
                  const destination = destinations.find(
                    (item) => item.id === destinationId,
                  )
                  return (
                    <div key={destinationId} className="trip-destination">
                      <img
                        className="trip-destination__image"
                        src={
                          destination
                            ? destination.images[0]
                            : 'https://picsum.photos/seed/placeholder/160/120'
                        }
                        alt={destination ? destination.name : 'Destination'}
                      />
                      <div className="trip-destination__info">
                        <h3 className="trip-destination__name">
                          {destination ? (
                            <Link to={`/destinations/${destination.id}`}>
                              {destination.name}
                            </Link>
                          ) : (
                            'Destination'
                          )}
                        </h3>
                        <p className="trip-destination__meta">
                          {destination
                            ? `${destination.region} • ${destination.type}`
                            : 'Unavailable'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="button button--small button--danger"
                        disabled={removing}
                        onClick={() => handleRemove(destinationId)}
                      >
                        Remove
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default TripDetailsPage
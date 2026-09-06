import { Link } from 'react-router-dom'
import { formatTripDates } from '../../utils/date.js'

function TripCard({ trip }) {
  const destinationCount = trip.destinationIds.length

  return (
    <article className="trip-card">
      <div className="trip-card__main">
        <h3 className="trip-card__name">
          <Link to={`/my-trips/${trip.id}`}>{trip.name}</Link>
        </h3>
        <p className="trip-card__meta">
          <span>{formatTripDates(trip.startDate, trip.endDate)}</span>
          <span aria-hidden="true">•</span>
          <span>
            {destinationCount}{' '}
            {destinationCount === 1 ? 'destination' : 'destinations'}
          </span>
        </p>
      </div>
      <div className="trip-card__actions">
        <Link to={`/my-trips/${trip.id}`} className="button button--small">
          View
        </Link>
        <Link
          to={`/my-trips/${trip.id}/edit`}
          className="button button--small button--secondary"
        >
          Edit
        </Link>
      </div>
    </article>
  )
}

export default TripCard
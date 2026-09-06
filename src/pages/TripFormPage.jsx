import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Message from '../components/common/Message.jsx'
import { getAllDestinations } from '../services/destinationService.js'
import { getTripById } from '../services/tripService.js'
import { useTrips } from '../hooks/useTrips.js'
import '../components/trips/trips.css'

function TripFormPage() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [searchParams] = useSearchParams()
  const preSelectedDestination = searchParams.get('destination')
  const navigate = useNavigate()

  const { createTrip, updateTrip } = useTrips()

  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [tripNotFound, setTripNotFound] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
  })
  const [selectedIds, setSelectedIds] = useState([])

  const destinationMap = useMemo(
    () => new Map(destinations.map((destination) => [destination.id, destination])),
    [destinations],
  )

  useEffect(() => {
    let active = true

    Promise.all([
      getAllDestinations(),
      id ? getTripById(id) : null,
    ])
      .then(([destinationList, existingTrip]) => {
        if (!active) {
          return
        }
        setDestinations(destinationList)
        if (existingTrip) {
          setForm({
            name: existingTrip.name,
            startDate: existingTrip.startDate,
            endDate: existingTrip.endDate,
          })
          setSelectedIds(existingTrip.destinationIds)
        } else if (isEditing) {
          setTripNotFound(true)
        } else if (preSelectedDestination) {
          const destinationParam = Number(preSelectedDestination)
          setSelectedIds((current) =>
            current.includes(destinationParam) ? current : [destinationParam],
          )
        }
        setLoading(false)
      })
      .catch(() => {
        if (active) {
          setLoadError(true)
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [id, isEditing, preSelectedDestination])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleToggleDestination = (destinationId) => {
    setSelectedIds((current) =>
      current.includes(destinationId)
        ? current.filter((item) => item !== destinationId)
        : [...current, destinationId],
    )
  }

  const handleRemoveDestination = (destinationId) => {
    setSelectedIds((current) => current.filter((item) => item !== destinationId))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')

    if (!form.name.trim()) {
      setFormError('Please give your trip a name.')
      return
    }
    if (!form.startDate || !form.endDate) {
      setFormError('Please choose start and end dates for your trip.')
      return
    }
    if (form.endDate < form.startDate) {
      setFormError('The end date must be on or after the start date.')
      return
    }
    if (selectedIds.length === 0) {
      setFormError('Select at least one destination for your trip.')
      return
    }

    setSaving(true)
    try {
      const trip = isEditing
        ? await updateTrip(id, {
            name: form.name,
            startDate: form.startDate,
            endDate: form.endDate,
            destinationIds: selectedIds,
          })
        : await createTrip({
            name: form.name,
            startDate: form.startDate,
            endDate: form.endDate,
            destinationIds: selectedIds,
          })
      navigate(`/my-trips/${trip.id}`, { replace: true })
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <Message variant="info">Loading trip form...</Message>
        </div>
      </section>
    )
  }

  if (loadError) {
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

  if (tripNotFound) {
    return (
      <section className="page">
        <div className="container">
          <Message variant="info" title="Trip not found.">
            The trip you are looking for does not exist.
          </Message>
          <p className="detail__not-found-action">
            <Link to="/my-trips" className="button">
              Back to My Trips
            </Link>
          </p>
        </div>
      </section>
    )
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
            {isEditing ? 'Edit Trip' : 'New Trip'}
          </span>
        </nav>

        <h1 className="page__title">
          {isEditing ? 'Edit Trip' : 'Plan a New Trip'}
        </h1>
        <p className="page__text">
          Give your trip a name, pick your dates and select the destinations
          you want to visit.
        </p>

        {formError && (
          <Message variant="error" title="Unable to save your trip">
            {formError}
          </Message>
        )}

        <form className="trip-form__card" onSubmit={handleSubmit} noValidate>
          <div className="trip-form__group">
            <label className="trip-form__label" htmlFor="trip-name">
              Trip name
            </label>
            <input
              id="trip-name"
              name="name"
              type="text"
              className="trip-form__input"
              placeholder="My Safari Adventure"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="trip-form__row">
            <div className="trip-form__group">
              <label className="trip-form__label" htmlFor="trip-start">
                Start date
              </label>
              <input
                id="trip-start"
                name="startDate"
                type="date"
                className="trip-form__input"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="trip-form__group">
              <label className="trip-form__label" htmlFor="trip-end">
                End date
              </label>
              <input
                id="trip-end"
                name="endDate"
                type="date"
                className="trip-form__input"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <h2 className="trip-form__section-title">Destinations</h2>
            <p className="trip-form__section-hint">
              Choose the destinations you want to include in this trip.
            </p>

            <div className="trip-form__options">
              {destinations.map((destination) => {
                const selected = selectedIds.includes(destination.id)
                return (
                  <label
                    key={destination.id}
                    className={`trip-form__option ${selected ? 'trip-form__option--selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleToggleDestination(destination.id)}
                    />
                    <span>
                      <span className="trip-form__option-title">
                        {destination.name}
                      </span>
                      <span className="trip-form__option-meta">
                        {destination.region} • {destination.type}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>

            <h3 className="trip-form__section-title">Selected destinations</h3>
            {selectedIds.length === 0 ? (
              <div className="trip-form__empty">
                No destinations selected yet. Pick at least one from the list
                above.
              </div>
            ) : (
              <div className="trip-form__selected">
                {selectedIds.map((destinationId) => {
                  const destination = destinationMap.get(destinationId)
                  if (!destination) {
                    return null
                  }
                  return (
                    <div
                      key={destination.id}
                      className="trip-form__selected-row"
                    >
                      <span>{destination.name}</span>
                      <button
                        type="button"
                        className="button button--small button--danger"
                        onClick={() => handleRemoveDestination(destination.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="trip-form__actions">
            <button
              type="submit"
              className="button"
              disabled={saving}
            >
              {saving
                ? 'Saving...'
                : isEditing
                  ? 'Save Changes'
                  : 'Save Trip'}
            </button>
            <Link
              to={isEditing ? `/my-trips/${id}` : '/my-trips'}
              className="button button--secondary"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default TripFormPage
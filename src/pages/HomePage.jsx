import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DestinationCard from '../components/destinations/DestinationCard.jsx'
import Message from '../components/common/Message.jsx'
import { getFeaturedDestinations } from '../services/destinationService.js'
import { TOURISM_TYPES } from '../data/destinations.js'
import '../components/destinations/destinations.css'
import './home.css'

const categoryDescriptions = {
  Safari:
    'Track the Great Migration and spot the Big Five across vast savannah plains.',
  Beach:
    'Relax on white-sand beaches and dive into turquoise Indian Ocean waters.',
  Mountain:
    'Climb Africa\u2019s highest peaks and trek through breathtaking landscapes.',
  Culture:
    'Meet local communities and experience Swahili and Maasai traditions.',
}

const HERO_IMAGES = [
  'https://picsum.photos/seed/tanzania-hero-1/1600/700',
  'https://picsum.photos/seed/tanzania-hero-2/1600/700',
  'https://picsum.photos/seed/tanzania-hero-3/1600/700',
]

function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let active = true
    getFeaturedDestinations()
      .then((data) => {
        if (active) {
          setFeatured(data)
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

  useEffect(() => {
    if (paused || HERO_IMAGES.length <= 1) {
      return undefined
    }
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [paused])

  const goToSlide = (target) => {
    setSlide(((target % HERO_IMAGES.length) + HERO_IMAGES.length) % HERO_IMAGES.length)
  }

  return (
    <>
      <section
        className="hero-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured Tanzania destinations"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="hero-carousel__slides"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {HERO_IMAGES.map((image, index) => (
            <div
              key={image}
              className="hero-carousel__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${HERO_IMAGES.length}`}
              aria-hidden={index !== slide}
            >
              <img
                className="hero-carousel__image"
                src={image}
                alt=""
                aria-hidden="true"
              />
              <div className="hero-carousel__overlay" aria-hidden="true" />
              <div className="container hero-carousel__content">
                <h1 className="hero-carousel__title">Explore Tanzania</h1>
                <p className="hero-carousel__text">
                  Discover beautiful destinations, wildlife, beaches and
                  unforgettable experiences.
                </p>
                <Link to="/destinations" className="button hero-carousel__cta">
                  Explore Destinations
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--prev"
          aria-label="Previous image"
          onClick={() => goToSlide(slide - 1)}
        >
          &lsaquo;
        </button>
        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--next"
          aria-label="Next image"
          onClick={() => goToSlide(slide + 1)}
        >
          &rsaquo;
        </button>

        <div
          className="hero-carousel__dots"
          role="tablist"
          aria-label="Choose image"
        >
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`hero-carousel__dot ${index === slide ? 'hero-carousel__dot--active' : ''}`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === slide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="page">
        <div className="container">
          <header className="destinations__header">
            <h2 className="page__title">Featured Destinations</h2>
            <p className="page__text">
              Hand-picked highlights to start your Tanzanian adventure.
            </p>
          </header>

          {loading && (
            <Message variant="info">Loading destinations...</Message>
          )}

          {!loading && error && (
            <Message variant="error">
              Something went wrong. Please try again.
            </Message>
          )}

          {!loading && !error && featured.length === 0 && (
            <Message variant="info" title="No featured destinations.">
              Check back soon for featured destinations.
            </Message>
          )}

          {!loading && !error && featured.length > 0 && (
            <div className="destinations-grid">
              {featured.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page">
        <div className="container">
          <header className="destinations__header">
            <h2 className="page__title">Explore by Category</h2>
            <p className="page__text">
              Whatever you are looking for, Tanzania has it all.
            </p>
          </header>

          <div className="categories-grid">
            {TOURISM_TYPES.map((type) => (
              <Link
                key={type}
                to={`/destinations?type=${type}`}
                className="category-card"
              >
                <h3 className="category-card__title">{type}</h3>
                <p className="category-card__text">
                  {categoryDescriptions[type]}
                </p>
                <span className="category-card__link">
                  Discover {type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__title">Ready to Plan Your Trip?</h2>
          <p className="cta__text">
            Browse destinations and build your perfect Tanzania itinerary.
          </p>
          <div className="cta__actions">
            <Link to="/destinations" className="button">
              Explore Destinations
            </Link>
            <Link to="/my-trips/new" className="button button--light">
              Plan a Trip
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
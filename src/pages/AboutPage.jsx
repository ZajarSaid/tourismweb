import { Link } from 'react-router-dom'
import { REGIONS, TOURISM_TYPES, destinations } from '../data/destinations.js'
import './about.css'

function AboutPage() {
  return (
    <>
      <section className="page">
        <div className="container">
          <h1 className="page__title">About Safari Explorer</h1>
          <p className="about__lead">
            Safari Explorer is your friendly guide to Tanzania. We make it easy
            to discover the country&apos;s most incredible destinations, save the
            ones you love and plan your own adventure.
          </p>

          <div className="about__grid">
            <div className="about-feature">
              <h2 className="about-feature__title">Discover Natural Wonders</h2>
              <p className="about-feature__text">
                From the Great Migration across the Serengeti to the summit of
                Mount Kilimanjaro and the beaches of Zanzibar, explore
                world-famous sights and hidden gems.
              </p>
            </div>
            <div className="about-feature">
              <h2 className="about-feature__title">Plan With Ease</h2>
              <p className="about-feature__text">
                Shortlist your favorite destinations, build simple trips with
                your own dates and keep everything in one place on your
                dashboard.
              </p>
            </div>
            <div className="about-feature">
              <h2 className="about-feature__title">Made for Everyone</h2>
              <p className="about-feature__text">
                A clean, responsive and accessible experience - equally at home
                on your phone as on your desktop, and simple enough for first
                time travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about__stats">
        <div className="container about__stats-inner">
          <div className="about-stat">
            <span>{destinations.length}</span>
            <p>Featured Destinations</p>
          </div>
          <div className="about-stat">
            <span>{REGIONS.length}</span>
            <p>Regions of Tanzania</p>
          </div>
          <div className="about-stat">
            <span>{TOURISM_TYPES.length}</span>
            <p>Tourism Types</p>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container about__cta">
          <h2>Ready to Explore?</h2>
          <p>
            Browse Tanzania&apos;s destinations and start planning your next
            adventure.
          </p>
          <Link to="/destinations" className="button">
            Explore Destinations
          </Link>
        </div>
      </section>
    </>
  )
}

export default AboutPage
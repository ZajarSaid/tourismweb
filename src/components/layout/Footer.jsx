import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { TOURISM_TYPES } from '../../data/destinations.js'

const socials = [
  { label: 'Facebook', short: 'f', href: 'https://facebook.com' },
  { label: 'Twitter', short: '𝕏', href: 'https://twitter.com' },
  { label: 'Instagram', short: '◎', href: 'https://instagram.com' },
  { label: 'YouTube', short: '▶', href: 'https://youtube.com' },
]

function Footer() {
  const { user } = useAuth()

  return (
    <footer className="footer">
      <div className="footer__glow footer__glow--left" aria-hidden="true" />
      <div className="footer__glow footer__glow--right" aria-hidden="true" />

      <div className="container">
        <div className="footer__top">
          <div className="footer__brand-col">
            <p className="footer__brand">
              Safari <span className="footer__brand-accent">Explorer</span>
            </p>
            <p className="footer__text">
              Discover the best of Tanzania - wildlife, beaches, mountains and
              culture.
            </p>
            <div className="footer__socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="footer__social"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Safari Explorer on ${social.label}`}
                >
                  {social.short}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__col" aria-label="Explore links">
            <h3 className="footer__heading">Explore</h3>
            <Link to="/destinations" className="footer__link">
              All Destinations
            </Link>
            {TOURISM_TYPES.map((type) => (
              <Link
                key={type}
                to={`/destinations?type=${type}`}
                className="footer__link"
              >
                {type}
              </Link>
            ))}
            <Link to="/about" className="footer__link">
              About
            </Link>
          </nav>

          <nav className="footer__col" aria-label="Account links">
            <h3 className="footer__heading">Account</h3>
            {user ? (
              <>
                <Link to="/dashboard" className="footer__link">
                  Dashboard
                </Link>
                <Link to="/my-trips" className="footer__link">
                  My Trips
                </Link>
                <Link to="/favorites" className="footer__link">
                  Favorites
                </Link>
                <Link to="/profile" className="footer__link">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="footer__link">
                  Login
                </Link>
                <Link to="/register" className="footer__link footer__link--accent">
                  Register
                </Link>
              </>
            )}
          </nav>

          <div className="footer__col">
            <h3 className="footer__heading">Get in touch</h3>
            <p className="footer__text footer__text--compact">
              Questions about your next safari? We are happy to help.
            </p>
            <a className="footer__link footer__link--mail" href="mailto:hello@safariexplorer.co">
              hello@safariexplorer.co
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Safari Explorer. All rights
            reserved.
          </p>
          <Link to="/" className="footer__top-link">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
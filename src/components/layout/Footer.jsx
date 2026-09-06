import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { TOURISM_TYPES } from '../../data/destinations.js'

function Footer() {
  const { user } = useAuth()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand-col">
            <p className="footer__brand">Safari Explorer</p>
            <p className="footer__text">
              Discover the best of Tanzania - wildlife, beaches, mountains and
              culture.
            </p>
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
                <Link to="/register" className="footer__link">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} Safari Explorer. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
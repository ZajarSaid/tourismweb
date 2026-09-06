import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page">
      <div className="container">
        <h1 className="page__title">Page not found</h1>
        <p className="page__text">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="button">
          Back to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
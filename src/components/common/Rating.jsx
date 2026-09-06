function Rating({ rating, reviewCount = null, className = '' }) {
  const filledStars = Math.round(rating)

  return (
    <span className={`rating ${className}`.trim()}>
      <span className="rating__stars" aria-hidden="true">
        {'★'.repeat(filledStars)}
        {'☆'.repeat(Math.max(0, 5 - filledStars))}
      </span>
      <span className="rating__value">{rating.toFixed(1)}</span>
      {reviewCount !== null && (
        <span className="rating__count">({reviewCount})</span>
      )}
    </span>
  )
}

export default Rating
function FavoriteButton({
  favorite = false,
  onToggle = null,
  showLabel = true,
  className = '',
}) {
  const handleClick = (event) => {
    event.preventDefault()
    if (onToggle) {
      onToggle(!favorite)
    }
  }

  return (
    <button
      type="button"
      className={`favorite-button ${favorite ? 'favorite-button--active' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-pressed={favorite}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span aria-hidden="true">{favorite ? '\u2665' : '\u2661'}</span>
      {showLabel && <span>{favorite ? 'Favorited' : 'Favorite'}</span>}
    </button>
  )
}

export default FavoriteButton
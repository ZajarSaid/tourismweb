export function formatDate(dateString) {
  if (!dateString) {
    return ''
  }
  const date = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTripDates(startDate, endDate) {
  if (!startDate || !endDate) {
    return ''
  }
  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return ''
  }
  const sameYear = start.getFullYear() === end.getFullYear()
  const options = { month: 'short', day: 'numeric' }
  if (!sameYear) {
    options.year = 'numeric'
  }
  return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
}
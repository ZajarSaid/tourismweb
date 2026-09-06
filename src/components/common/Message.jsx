function Message({ variant = 'info', title = null, children }) {
  const role = variant === 'error' ? 'alert' : 'status'

  return (
    <div className={`message message--${variant}`} role={role}>
      {title && <p className="message__title">{title}</p>}
      <p className="message__text">{children}</p>
    </div>
  )
}

export default Message
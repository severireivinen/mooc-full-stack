import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationStyle = {
    color: notification.text === null ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (notification.text === null) {
    return null
  }
  return (
    <div className="notification" style={notificationStyle}>
      {notification.text}
    </div>
  )
}

export default Notification
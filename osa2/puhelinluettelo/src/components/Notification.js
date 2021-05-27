import React from 'react'

const Notification = ({ message, isError }) => {
    const notificationStyle = {
        color: isError ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message.display}
        </div>
    )
}

export default Notification
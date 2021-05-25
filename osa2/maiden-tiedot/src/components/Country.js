import React from 'react'

const Country = ({ name, handleShowButton }) => {
    const buttonHandler = () => (
        handleShowButton(name)
    )

    return (
        <li>{name} <button onClick={buttonHandler}>show</button></li>
    )
}

export default Country
import React, { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleRemove }) => {

  const [details, setDetails] = useState(false)
  const [text, setText] = useState(false)

  const handleViewButton = () => {
    setDetails(!details)
    setText(!text)
  }

  const showDetails = { display: details ? 'block' : 'none' }
  const buttonText = text ? 'hide' : 'show'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} {blog.author} <button onClick={handleViewButton}>{buttonText}</button></span>
      </div>
      <div style={showDetails}>
        <ul>
          <li>
            {blog.url}
          </li>
          <li>
            {blog.likes} <button onClick={handleLike}>like</button>
          </li>
          <li>
            {blog.user.name}
          </li>
        </ul>
        {user.name === blog.user.name ?
          <button onClick={handleRemove}>remove</button> :
          <></>
        }
      </div>
    </div>
  )
}


export default Blog
import React, { useState } from 'react'

const Blog = ({ user, blog, handleLike, handleRemove }) => {

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
    <td style={blogStyle}>
      <span className="blog-title">{blog.title}</span> <span className="blog-author">{blog.author}</span> <button onClick={handleViewButton}>{buttonText}</button>

      <div className="details-container" style={showDetails}>
        <ul className="blog-details">
          <li>
            {blog.url}
          </li>
          <li>
            {blog.likes} <button className="like-btn" onClick={handleLike}>like</button>
          </li>
          <li>
            <span>{blog.user.name}</span>
          </li>
        </ul>
        {user.name === blog.user.name ?
          <button onClick={handleRemove}>remove</button> :
          <></>
        }
      </div>
    </td>
  )
}


export default Blog
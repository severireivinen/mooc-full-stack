import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <Form className='blog-form' onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="blog-title-input"
            value={newTitle}
            onChange={handleTitleChange}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="blog-author-input"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="blog-url-input"
            value={newUrl}
            onChange={handleUrlChange}
          />
          <Button variant='primary' type='submit' id='create-blog-button'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${user.name} added`, 3))
    } catch (error) {
      dispatch(setNotification('please login again', 3))
    }
  }

  const removeBlog = blog => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`removed ${blog.title}`, 3))
  }

  const updateLikes = blog => {
    dispatch(likeBlog(blog))
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (

    <Table striped>
      <tbody>
        <tr>
          {blogForm()}
        </tr>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              handleLike={() => updateLikes(blog)}
              handleRemove={() => removeBlog(blog)}
            />
          </tr>
        )}
      </tbody>
    </Table>

  )
}



export default BlogList
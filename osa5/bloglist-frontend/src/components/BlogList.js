import React from 'react'
import Blog from '../components/Blog'
import BlogForm from './BlogForm'

const BlogList = ({ user, blogs, handleLogout, handleNewBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => (
    <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <div>
            <BlogForm handleNewBlog={handleNewBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
        </div>
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>
    </div>
)

export default BlogList
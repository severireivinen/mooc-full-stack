import React from 'react'

const BlogForm = ({ handleNewBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
            <div>
                title:
                <input
                    value={newTitle}
                    onChange={handleTitleChange}
                />
                <br />
                author:
                <input
                    value={newAuthor}
                    onChange={handleAuthorChange}
                />
                <br />
                url:
                <input
                    value={newUrl}
                    onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm
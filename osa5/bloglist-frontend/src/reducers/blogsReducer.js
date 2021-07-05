import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG': {
    const changedBlog = action.data.blog
    return state.map(blog => blog.id !== changedBlog.id ? blog : changedBlog)
  }
  case 'REMOVE_BLOG': {
    const removedBlog = action.data.blog
    return state.filter(blog => blog.id !== removedBlog.id)
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogsService.update(blog, { ...blog, likes: blog.likes += 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: { blog: updatedBlog }
    })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogsService.remove(blog)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { blog }
    })
  }
}

export default blogsReducer
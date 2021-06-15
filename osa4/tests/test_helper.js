const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Andre Polk",
        author: "050-32452321",
        url: "www.example.com",
        likes: 21,
        id: "60be328e4ba8e7231cbf7c62"
    },
    {
        title: "Andre Polk",
        author: "050-32452321",
        url: "www.example.com",
        likes: 21,
        id: "60be336d8d321b32406c55fc"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'nonexist',
        author: 'nonexist',
        url: 'nonexist',
        likes: 0
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}
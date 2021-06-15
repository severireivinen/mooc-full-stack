const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP GET request', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('require id as identifying field', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('HTTP POST request', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "New Blog",
            author: "New Blogger",
            url: "www.newblog.blog",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        const authors = blogsAtEnd.map(b => b.author)
        const urls = blogsAtEnd.map(b => b.url)
        expect(titles).toContain('New Blog')
        expect(authors).toContain('New Blogger')
        expect(urls).toContain('www.newblog.blog')
    })

    test('set likes to 0 if missing', async () => {
        const blogWithNoLikes = {
            title: "New Blog",
            author: "New Blogger",
            url: "www.newblog.blog"
        }

        const response = await api
            .post('/api/blogs')
            .send(blogWithNoLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('Bad request 400 if title is missing', async () => {
        const blogWithNoTitle = {
            author: "New Blogger",
            url: "www.newblog.blog",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(blogWithNoTitle)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('Bad request 400 if url is missing', async () => {
        const blogWithNoUrl = {
            title: "New Blog",
            author: "New Blogger",
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(blogWithNoUrl)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('HTTP DELETE request', () => {
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        //const titles = blogsAtEnd.map(b => b.title)
        //expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('HTTP PUT request', () => {
    test('likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        //const blogsAtEnd = await helper.blogsInDb()
        //expect(blogsAtEnd[0].toEqual(blogToUpdate))
    })
})

afterAll(() => {
    mongoose.connection.close()
})
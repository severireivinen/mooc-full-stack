import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm
        createBlog={createBlog}
      />
    )
  })

  test('create a new blog using the callback function recieved as a prop with the correct information', () => {
    const title = component.container.querySelector('#blog-title-input')
    const author = component.container.querySelector('#blog-author-input')
    const url = component.container.querySelector('#blog-url-input')
    const blogForm = component.container.querySelector('.blog-form')

    fireEvent.change(title, {
      target: { value: 'New title' }
    })
    fireEvent.change(author, {
      target: { value: 'New author' }
    })
    fireEvent.change(url, {
      target: { value: 'New url' }
    })
    fireEvent.submit(blogForm)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('New title')
    expect(createBlog.mock.calls[0][0].author).toBe('New author')
    expect(createBlog.mock.calls[0][0].url).toBe('New url')
  })
})
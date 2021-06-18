import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test url',
  likes: 1,
  user: 'Superuser'
}

const user = {
  name: 'Superuser'
}

describe('<Blog />', () => {
  let component
  let mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockHandler}
      />
    )
  })

  test('renders elements for title and author', () => {
    expect(component.container.querySelector('.blog-title')).toBeDefined()
    expect(component.container.querySelector('.blog-author')).toBeDefined()
  })

  test('renders content for title and author', () => {
    expect(component.container.querySelector('.blog-title')).toHaveTextContent('Test title')
    expect(component.container.querySelector('.blog-author')).toHaveTextContent('Test author')
  })

  test('render details on show-button click', async () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container.querySelector('.details-container')).not.toHaveStyle('display: none')
  })

  test('double clicking Like-button calls the event handler function twice', () => {
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
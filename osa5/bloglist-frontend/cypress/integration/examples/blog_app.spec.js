describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test user',
      username: 'test',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()

      cy.contains('Test user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('invalid')
      cy.get('#password').type('invalid123')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test123' })
    })
    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#blog-title-input').type('New title')
      cy.get('#blog-author-input').type('New author')
      cy.get('#blog-url-input').type('New url')
      cy.get('#create-blog-button').click()
      cy.contains('New title New author')
    })

    describe('and blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first title', author: 'first author', url: 'first url' })
      })
      it('blog can be liked', function () {
        cy.contains('first title')
        cy.contains('show').click()
        cy.contains('0')
        cy.contains('like').click()
        cy.contains('1')
      })

      it('blog can be deleted by the right useer', function() {
        cy.contains('first title')
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('.notification')
          .should('contain', 'blog deleted successfully')
      })
    })
  })
})
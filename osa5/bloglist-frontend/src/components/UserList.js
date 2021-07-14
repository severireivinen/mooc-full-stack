import React from 'react'
import User from './User'

const UserList = ({ blogs }) => {
  const users = blogs.map(blog => blog.user)
  const uniqueUsers = Array.from(new Set(users.map(user => user.id))).map(id => (users.find(user => user.id === id)))

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {uniqueUsers.map(user =>
            <User key={user.id} user={user} userBlogs={[...blogs.filter(blog => blog.user.id === user.id)]} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
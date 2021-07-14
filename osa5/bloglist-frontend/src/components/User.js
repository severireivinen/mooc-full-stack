import React from 'react'

const User = ({ user, userBlogs }) => {
  const blogs = userBlogs.length

  return (
    <tr>
      <td>
        {user.name}
      </td>
      <td>
        {blogs}
      </td>
    </tr>


  )
}

export default User
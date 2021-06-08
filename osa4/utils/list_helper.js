const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, curr) => (total + curr.likes), 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostLikedBlog = blogs.find(blog => blog.likes === mostLikes)
    return (
        {
            title: mostLikedBlog.title,
            author: mostLikedBlog.author,
            likes: mostLikedBlog.likes
        }
    )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
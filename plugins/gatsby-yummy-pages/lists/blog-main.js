const path = require('path')
const {createPaginated} = require('./common')

function createMainBlogPage({ actions, graphql }) {
  return graphql(`
    {
      allPost {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    createPaginated({
      actions,
      collection: result.data.allPost.edges,
      baseUrl: '/blog/',
      component: path.resolve('./src/templates/blog-post-list.js')
    })
  })
}

module.exports = {
  createMainBlogPage
}

const path = require('path')

function createPostPages({ actions, graphql }) {
  const { createPage } = actions
  const blogPostTemplate = path.resolve('./src/templates/post-page.js')

  return graphql(`
    {
      allRecipe(
        sort: { order: DESC, fields: [published_at] }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allRecipe.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: blogPostTemplate,
        context: {
          slug: node.slug,
          fullHeaderVersion: false,
          isSingleRecipe: true
        }
      })
    })
  })
}

module.exports = {
  createPostPages
}

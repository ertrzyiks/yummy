const path = require('path')

function createPostPages({ actions, graphql }) {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`./src/templates/post-page.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug
        }
      })
    })
  })
}

module.exports = {
  createPostPages
}

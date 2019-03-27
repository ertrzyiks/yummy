const path = require('path')

const { createTagPages } = require('./lists/tags')
const { createCategoryPages } = require('./lists/categories')
const { createMainPage } = require('./lists/main')

exports.createPages = ({ actions, graphql }) => {
  return Promise.resolve()
    .then(() => createMainPage({ actions, graphql }))
    .then(() => createRecipePages({ actions, graphql }))
    .then(() => createTagPages({ actions, graphql }))
    .then(() => createCategoryPages({ actions, graphql }))
}

async function createRecipePages({ actions, graphql }) {
  const { createPage } = actions

  const result = await graphql(`
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
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const collection = result.data.allRecipe.edges
  const component = path.resolve('./src/templates/post-page.js')

  collection.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component,
      context: {
        slug: node.slug,
        fullHeaderVersion: false,
        isSingleRecipe: true
      }
    })
  })
}
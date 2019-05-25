const path = require('path')

const { createTagPages } = require('./lists/tags')
const { createCategoryPages } = require('./lists/categories')
const { createMainPage } = require('./lists/main')
const { createMainBlogPage } = require('./lists/blog-main')

exports.createPages = ({ actions, graphql }) => {
  return Promise.resolve()
    .then(() => createError404Page({ actions }))
    .then(() => createMainPage({ actions, graphql }))
    .then(() => createRecipePages({ actions, graphql }))
    .then(() => createTagPages({ actions, graphql }))
    .then(() => createCategoryPages({ actions, graphql }))
    .then(() => createBlogPostPages({ actions, graphql }))
    .then(() => createMainBlogPage({ actions, graphql}))
}

async function createError404Page({ actions }) {
  const { createPage } = actions

  createPage({
    path: '/404.html',
    component: path.resolve('./src/templates/error-404.js'),
    context: {
      fullHeaderVersion: false
    }
  })
}

async function createBlogPostPages({ actions, graphql}) {
  const { createPage } = actions

  const result = await graphql(`
    {
      allPost(
        sort: { order: DESC, fields: [published_at] }
      ) {
        edges {
          node {
            title
            published_at
            slug
            headline {
              childMarkdownRemark {
                html
              }
            }
            content {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const posts = result.data.allPost.edges
  const component = path.resolve('./src/templates/blog-post-page/index.js')

  posts.forEach(({ node }) => {
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
  const component = path.resolve('./src/templates/post-page/index.js')

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

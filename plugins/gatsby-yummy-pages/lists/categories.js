const path = require('path')
const {createPaginated} = require('./common')

async function createCategoryPages({ actions, graphql }) {
  const result = await graphql(`
  {
    allRecipeCategory {
      edges {
        node {
          name
          slug
        }
      }
    }
  }`)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const categories = result.data.allRecipeCategory.edges.map(category => category.node)

  return Promise.all(categories.map(category => createCategoryPage({
    category: category.name,
    slug: category.slug,
    actions,
    graphql
  })))
}

async function createCategoryPage({ category, slug, actions, graphql }) {
  const result = await graphql(`
    query ($category: String!) {
      allRecipe(
        filter: { category: { name: { eq: $category } } }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `, {category})

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  createPaginated({
    actions,
    collection: result.data.allRecipe.edges,
    component: path.resolve('./src/templates/post-list-by-category.js'),
    baseUrl: `/${slug}/`,
    context: {
      slug: slug,
      category: category,
      fullHeaderVersion: false,
      subsection: category
    }
  })
}

module.exports = {
  createCategoryPages
}

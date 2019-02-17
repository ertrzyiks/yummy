const path = require('path')

function createCategoryPages({ actions, graphql }) {
  return graphql(`
  {
    allRecipeCategory {
      edges {
        node {
          name
          slug
        }
      }
    }
  }`).then(result => {
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
  })
}

function createCategoryPage({ category, slug, actions, graphql }) {
  const { createPage } = actions

  return graphql(`
    query ($category: String!) {
      allRecipe(
        filter: { category: { in: [$category] } }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `, {category}).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allRecipe.edges
    const postsPerPage = 10
    const totalPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: totalPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${slug}` : `/${slug}/page/${i + 1}`,
        component: path.resolve('./src/templates/post-list-by-category.js'),
        context: {
          slug: slug,
          category: category,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: totalPages,
          currentPage: i + 1
        },
      })
    })
  })
}

module.exports = {
  createCategoryPages
}

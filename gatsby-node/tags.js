const path = require('path')
const slugify = require('underscore.string/slugify')

function createTagPages({ actions, graphql }) {
  return graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
            fieldValue
          }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const tags = result.data.allMarkdownRemark.group.map(tag => tag.fieldValue)
    return Promise.all(tags.map(tag => createTagPage({ tag, actions, graphql })))
  })
}

function createTagPage({ tag, actions, graphql }) {
  const { createPage } = actions
  const slug = slugify(tag)

  return graphql(`
    query ($tag: String!) {
      allRecipe(
        filter: { tags: { in: [$tag] } }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `, {tag}).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const posts = result.data.allRecipe.edges
    const postsPerPage = 9
    const totalPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: totalPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tag/${slug}` : `/tag/${slug}/page/${i + 1}`,
        component: path.resolve('./src/templates/post-list-by-tag.js'),
        context: {
          slug: slug,
          tag: tag,
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
  createTagPages
}

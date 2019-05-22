const path = require('path')
const slugify = require('underscore.string/slugify')
const {createPaginated} = require('./common')

async function createTagPages({ actions, graphql }) {
  const result = await graphql(`
    {
      allRecipe {
        group(field: tags) {
            fieldValue
          }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const tags = result.data.allRecipe.group.map(tag => tag.fieldValue)

  return Promise.all(tags.map(tag => createTagPage({ tag, actions, graphql })))
}

async function createTagPage({ tag, actions, graphql }) {
  const slug = slugify(tag)

  const result = await graphql(`
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
  `, {tag})

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  createPaginated({
    actions,
    collection: result.data.allRecipe.edges,
    component: path.resolve('./src/templates/post-list-by-tag.js'),
    baseUrl: `/tag/${slug}/`,
    context: {
      slug: slug,
      tag: tag,
      fullHeaderVersion: false,
      subsection: tag
    }
  })
}

module.exports = {
  createTagPages
}

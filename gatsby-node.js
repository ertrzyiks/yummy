const crypto = require('crypto')
const fs = require('fs')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createTagPages } = require('./gatsby-node/tags')
const { createCategoryPages } = require('./gatsby-node/categories')
const { createPostPages } = require('./gatsby-node/posts')
const { createIndexPage } = require('./gatsby-node/index')
const { split } = require('./gatsby-node/content')

exports.onCreateNode = async ({ node, getNode, loadNodeContent, createNodeId, actions }) => {
  const { createNode } = actions

  if (node.internal.type === `MarkdownRemark` && getNode(node.parent).internal.type == 'File') {
    const slug = createFilePath({ node, getNode, trailingSlash: false })

    const content = await loadNodeContent(node)
    const sections = split(content)

    if (sections.length !== 3) {
      throw new Error(`Expected exactly three sections inside node: ${slug}. Check the number of splitters in the content.`)
    }

    const headlineId = createRecipePart(node, 'Headline', sections[0], {createNode, createNodeId})
    const ingredientsId = createRecipePart(node, 'Ingredients', sections[1], {createNode, createNodeId})
    const directionsId = createRecipePart(node, 'Directions', sections[2], {createNode, createNodeId})

    const recipeContent = {
      name: node.frontmatter.title,
      published_at: node.frontmatter.date,
      required_time: node.frontmatter.required_time,
      category: node.frontmatter.category,
      tags: node.frontmatter.tags,
      featured_image: node.frontmatter.featured_image,
      headline___NODE: headlineId,
      ingredients___NODE: ingredientsId,
      directions___NODE: directionsId
    }

    const recipeNode = {
      id: createNodeId(`${recipeContent.name} >>> Recipe`),
      ...recipeContent,
      slug,
      children: [],
      parent: node.id,
      internal: {
        content: JSON.stringify(recipeContent),
        type: `Recipe`,
      },
    }

    recipeNode.internal.contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(recipeNode))
      .digest(`hex`)

    createNode(recipeNode)
  }
}

function createRecipePart(parent, kind, content, {createNodeId, createNode}) {
  const id = createNodeId(`${kind} >>> ${parent.id} >>> RecipePart`)
  const node = {
    id: id,
    children: [],
    parent: parent.id,
    internal: {
      content: content,
      type: `RecipePart`,
      mediaType: 'text/markdown'
    }
  }

  node.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(content)
    .digest(`hex`)

  createNode(node)
  return id
}

function createCategory({ createNode, name, slug, position }) {
  const fieldData = {name, slug, position}

  createNode({
    name,
    slug,
    position,

    // Required fields.
    id: slug,
    parent: null,
    children: [],
    internal: {
      type: `RecipeCategory`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(fieldData))
        .digest(`hex`),
      content: JSON.stringify(fieldData)
    },

  })
}

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions

  createCategory({ createNode, name: 'obiady', slug: 'obiady', position: 3 })
  createCategory({ createNode, name: 'śniadaniowe', slug: 'sniadaniowe', position: 1 })
  createCategory({ createNode, name: 'ciasta', slug: 'ciasta', position: 4 })
  createCategory({ createNode, name: 'zupy', slug: 'zupy', position: 2 })
  createCategory({ createNode, name: 'koktajle', slug: 'koktajle', position: 5 })
}

const createSearchDataJson = ({ graphql }) => {
  return graphql(`
    {
      allRecipe {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const pages = result.data.allRecipe.edges.map(({node}) => {
      return {
        path: node.slug,
        title: node.name
      }
    })

    fs.writeFileSync('./data.json', JSON.stringify({ pages }))
  })
}

exports.createPages = ({ actions, graphql }) => {
  return Promise.resolve()
    .then(() => createSearchDataJson({ graphql }))
    .then(() => createIndexPage({ actions, graphql }))
    .then(() => createPostPages({ actions, graphql }))
    .then(() => createTagPages({ actions, graphql }))
    .then(() => createCategoryPages({ actions, graphql }))
}

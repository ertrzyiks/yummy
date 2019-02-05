const crypto = require('crypto')
const fs = require('fs')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createTagPages } = require('./gatsby-node/tags')
const { createCategoryPages } = require('./gatsby-node/categories')
const { createPostPages } = require('./gatsby-node/posts')
const { createIndexPage } = require('./gatsby-node/index')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

function createCategory({ createNode, name, slug }) {
  const fieldData = {name, slug}

  createNode({
    name,
    slug,

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

  createCategory({ createNode, name: 'obiady', slug: 'obiady'})
  createCategory({ createNode, name: 'śniadaniowe', slug: 'sniadaniowe'})
  createCategory({ createNode, name: 'ciasta', slug: 'ciasta'})
  createCategory({ createNode, name: 'zupy', slug: 'zupy'})
  createCategory({ createNode, name: 'koktajle', slug: 'koktajle'})
}

const createSearchDataJson = ({ graphql }) => {
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const pages = result.data.allMarkdownRemark.edges.map(({node}) => {
      return {
        path: node.fields.slug,
        title: node.frontmatter.title
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

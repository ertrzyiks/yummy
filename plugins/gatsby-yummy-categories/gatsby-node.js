const crypto = require('crypto')

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

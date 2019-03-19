const crypto = require('crypto')
const slugify = require('underscore.string/slugify')
const { createFilePath } = require('gatsby-source-filesystem')
const { split } = require('./content')

exports.onCreateNode = async ({ node, getNode, loadNodeContent, createNodeId, actions }) => {
  const { createNode } = actions

  if (node.internal.type === 'MarkdownRemark' && getNode(node.parent).internal.type === 'File') {
    const slug = createFilePath({ node, getNode, trailingSlash: false })
    const categorySlug = slug.split('/')[1]

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
      html_title: node.frontmatter.html_title || node.frontmatter.title,
      html_description: node.frontmatter.html_description || sections[0].replace(/^<p>(.*)<\/p>$/, '$1'),
      published_at: node.frontmatter.date,
      required_time: node.frontmatter.required_time,
      tags: sortTagsAlphabetically(node.frontmatter.tags),
      featured_image: node.frontmatter.featured_image || './cover.jpg',
      headline___NODE: headlineId,
      ingredients___NODE: ingredientsId,
      directions___NODE: directionsId,
      category___NODE: categorySlug
    }

    const recipeNode = {
      id: createNodeId(`${recipeContent.name} >>> Recipe`),
      ...recipeContent,
      slug,
      children: [],
      parent: node.id,
      internal: {
        content: JSON.stringify(recipeContent),
        type: 'Recipe',
      },
    }

    recipeNode.internal.contentDigest = crypto
      .createHash('md5')
      .update(JSON.stringify(recipeNode))
      .digest('hex')

    createNode(recipeNode)
  }
}

function sortTagsAlphabetically(tags) {
  tags.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  return tags
}

function createRecipePart(parent, kind, content, {createNodeId, createNode}) {
  const id = createNodeId(`${kind} >>> ${parent.id} >>> RecipePart`)
  const node = {
    id: id,
    children: [],
    parent: parent.id,
    internal: {
      content: content,
      type: 'RecipePart',
      mediaType: 'text/markdown'
    }
  }

  node.internal.contentDigest = crypto
    .createHash('md5')
    .update(content)
    .digest('hex')

  createNode(node)
  return id
}

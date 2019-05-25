const crypto = require('crypto')
const { createFilePath } = require('gatsby-source-filesystem')
const { split } = require('../common/content')

exports.onCreateNode = async ({ node, getNode, loadNodeContent, createNodeId, actions }) => {
  const { createNode } = actions

  if (node.internal.type !== 'MarkdownRemark') { return }
  if (getNode(node.parent).internal.type !== 'File') { return }
  if (getNode(node.parent).sourceInstanceName !== 'posts') { return }

  const slug = createFilePath({ node, getNode, trailingSlash: false })
  const content = await loadNodeContent(node)
  const sections = split(content)

  if (sections.length !== 2) {
    throw new Error('Expected exactly two sections within a blog post node. Check the number of splitters in the content.')
  }

  console.log('SECTIONS', sections)

  const headlineId = createBlogPostPart(node, 'Headline', sections[0], {createNode, createNodeId})
  const contentId = createBlogPostPart(node, 'Content', sections[1], {createNode, createNodeId})

  if (isNaN(new Date(node.frontmatter.date).getTime())) {
    throw new Error(`Invalid date ${node.frontmatter.date} for recipe: ${node.frontmatter.title}`)
  }

  const postContent = {
    title: node.frontmatter.title,
    html_title: node.frontmatter.html_title || node.frontmatter.title,
    html_description: node.frontmatter.html_description,
    published_at: node.frontmatter.date,
    headline___NODE: headlineId,
    content___NODE: contentId
  }

  const postNode = {
    id: createNodeId(`${postContent.title} >>> Post`),
    ...postContent,
    slug,
    children: [],
    parent: node.id,
    internal: {
      content: JSON.stringify(postContent),
      type: 'Post',
    },
  }

  postNode.internal.contentDigest = crypto
    .createHash('md5')
    .update(JSON.stringify(postNode))
    .digest('hex')

  createNode(postNode)
}

function createBlogPostPart(parent, kind, content, {createNodeId, createNode}) {
  const id = createNodeId(`${kind} >>> ${parent.id} >>> BlogPostPart`)
  const node = {
    id: id,
    children: [],
    parent: parent.id,
    internal: {
      content: content,
      type: 'BlogPostPart',
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

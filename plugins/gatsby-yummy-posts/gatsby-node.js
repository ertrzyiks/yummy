const crypto = require('crypto')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = async ({ node, getNode, loadNodeContent, createNodeId, actions }) => {
  const { createNode } = actions

  if (node.internal.type !== 'MarkdownRemark') { return }
  if (getNode(node.parent).internal.type !== 'File') { return }
  if (getNode(node.parent).sourceInstanceName !== 'posts') { return }

  const slug = createFilePath({ node, getNode, trailingSlash: false })
  const content = await loadNodeContent(node)

  const contentId = createBlogPostPart(node, 'Content', content, {createNode, createNodeId})

  const postContent = {
    title: node.frontmatter.title,
    html_title: node.frontmatter.html_title || node.frontmatter.title,
    html_description: node.frontmatter.html_description,
    published_at: node.frontmatter.date,
    content___NODE: contentId
  }

  const postNode = {
    id: createNodeId(`${postContent.title} >>> Post`),
    ...postContent,
    slug,
    children: [],
    parent: node.id,
    internal: {
      content: content,
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
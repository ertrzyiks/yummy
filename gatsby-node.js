const { createTagPages } = require('./gatsby-node/tags')
const { createCategoryPages } = require('./gatsby-node/categories')
const { createPostPages } = require('./gatsby-node/posts')
const { createIndexPage } = require('./gatsby-node/index')

exports.createPages = ({ actions, graphql }) => {
  return Promise.resolve()
    .then(() => createIndexPage({ actions, graphql }))
    .then(() => createPostPages({ actions, graphql }))
    .then(() => createTagPages({ actions, graphql }))
    .then(() => createCategoryPages({ actions, graphql }))
}

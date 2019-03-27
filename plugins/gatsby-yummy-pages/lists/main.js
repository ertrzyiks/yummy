const path = require('path')
const {createPaginated} = require('./common')

function createMainPage({ actions, graphql }) {
  return graphql(`
    {
      allRecipe {
        edges {
          node {
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    createPaginated({
      actions,
      collection: result.data.allRecipe.edges,
      baseUrl: '/',
      component: path.resolve('./src/templates/post-list.js')
    })
  })
}

module.exports = {
  createMainPage
}

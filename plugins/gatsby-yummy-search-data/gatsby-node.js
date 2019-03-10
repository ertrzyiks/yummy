const fs = require('fs')

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
  return createSearchDataJson({ graphql })
}

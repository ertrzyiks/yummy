function createPaginated({collection, component, baseUrl, actions, context}) {
  const itemsPerPage = 9
  const {createPage} = actions
  const totalPages = Math.ceil(collection.length / itemsPerPage)

  return Array.from({ length: totalPages }).map((_, i) => {
    return createPage({
      path: i === 0 ? baseUrl : `${baseUrl}strony/${i + 1}`,
      component: component,
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        totalPages: totalPages,
        currentPage: i + 1,
        ...context
      }
    })
  })
}


module.exports = {
  createPaginated
}

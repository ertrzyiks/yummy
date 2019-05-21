import { paginationElementTypes } from './paginationConsts';

export function calculatePages(numPreviousPages, numNextPages, currentPage, totalPages) {
  if (totalPages === 1) {
    return []
  }

  const paginationElements = [
    {
      pageNumber: currentPage,
      type: paginationElementTypes.CURRENT_PAGE,
    }
  ]

  const ellipsis = {
    type: paginationElementTypes.SEPARATOR,
  }

  for (let i = 1; i <= numPreviousPages; i++) {
    if (currentPage - i < 1) {
      break;
    }

    paginationElements.unshift({
      pageNumber: currentPage - i,
      type: paginationElementTypes.PAGE
    })
  }

  const firstPageNumber = paginationElements[0].pageNumber
  if (firstPageNumber > 1) {
    if (firstPageNumber > 2) {
      paginationElements.unshift(ellipsis)
    }

    paginationElements.unshift({
      pageNumber: 1,
      type: paginationElementTypes.PAGE
    })
  }

  for (let i = 1; i <= numNextPages; i++) {
    if (currentPage + i > totalPages) {
      break;
    }

    paginationElements.push({
      pageNumber: currentPage + i,
      type: paginationElementTypes.PAGE
    })
  }

  const lastPageNumber = paginationElements[paginationElements.length - 1].pageNumber
  if (lastPageNumber < totalPages) {
    if (lastPageNumber < totalPages - 1) {
      paginationElements.push(ellipsis)
    }

    paginationElements.push({
      pageNumber: totalPages,
      type: paginationElementTypes.PAGE
    })
  }

  return paginationElements
}


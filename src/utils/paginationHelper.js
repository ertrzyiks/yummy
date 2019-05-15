export function calculatePages(numPreviousPages, numNextPages, currentPage, totalPages) {
  const paginationElements = [
    {
      displayText: currentPage,
      requiresLink: false,
      isCurrent: true
    }
  ]

  const ellipsis = {
    displayText: '...',
    requiresLink: false
  }

  for (let i = 1; i <= numPreviousPages; i++) {
    if (currentPage - i < 1) {
      break;
    }

    paginationElements.unshift({
      displayText: currentPage - i,
      requiresLink: true,
    })
  }

  const firstElementText = paginationElements[0].displayText
  if (firstElementText > 1) {
    if (firstElementText > 2) {
      paginationElements.unshift(ellipsis)
    }

    paginationElements.unshift({
      displayText: 1,
      requiresLink: true
    })
  }

  for (let j = 1; j <= numNextPages; j++) {
    if (currentPage + j > totalPages) {
      break;
    }

    paginationElements.push({
      displayText: currentPage + j,
      requiresLink: true
    })
  }

  const lastElementText = paginationElements[paginationElements.length - 1].displayText
  if (lastElementText < totalPages) {
    if (lastElementText < totalPages - 1) {
      paginationElements.push(ellipsis)
    }

    paginationElements.push({
      displayText: totalPages,
      requiresLink: true
    })
  }

  return paginationElements
}


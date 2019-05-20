export function calculatePages(numPreviousPages, numNextPages, currentPage, totalPages) {
  if (totalPages === 1) {
    return []
  }

  const paginationElements = [
    {
      displayText: currentPage,
      requiresLink: false,
      isCurrent: true
    }
  ]

  const ellipsis = {
    displayText: '\u2026',
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

  for (let i = 1; i <= numNextPages; i++) {
    if (currentPage + i > totalPages) {
      break;
    }

    paginationElements.push({
      displayText: currentPage + i,
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


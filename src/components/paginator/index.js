import React from 'react'
import { Link } from 'gatsby'
import styles from './paginator.module.sass'
import buttonStyles from '../button/button.transparent-noborder.module.sass'
import ChevronLeft from '../icons/chevron-left'
import ChevronRight from '../icons/chevron-right'

const removeTrailingSlash = (path) => path.replace(/\/$/, '')
const removePageNumberSegment = (path) => path.replace(/\/page\/\d+$/, '')

const toSubsectionPath = (path) => {
  const newPath = removeTrailingSlash(path)
  const subsectionPath = removePageNumberSegment(newPath)

  return subsectionPath === '' ? '/' : subsectionPath
}

const generatePagePath = (subsectionPath, page) => {
  if (page === 1) {
    return subsectionPath
  }

  if (subsectionPath === '/') {
    return `/page/${page}`
  }

  return`${subsectionPath}/page/${page}`
}

const generatePaginationLinkElement = (pagePath, pageNumber) => {
  return (
    <li className={styles.page_nav_item}>
      <Link className={styles.page_link} to={pagePath}>{pageNumber}</Link>
    </li>
  )
}

export default function Paginator ({currentPage, totalPages, currentPath}) {
  const subsectionPath = toSubsectionPath(currentPath)
  const nextPagePath = generatePagePath(subsectionPath, currentPage + 1)
  const prevPagePath = generatePagePath(subsectionPath, currentPage - 1)
  const firstPagePath = generatePagePath(subsectionPath, 1)
  const lastPagePath = generatePagePath(subsectionPath, totalPages)
  const prePreviousPagePath = generatePagePath(subsectionPath, currentPage - 2)
  const postNextPagePath = generatePagePath(subsectionPath, currentPage + 2)

  const ellipsisElement = <li className={styles.page_nav_item}><span>...</span></li>

  const prePreviousIndex = currentPage - 2
  const postNextIndex = currentPage + 2

  const showFirstPageLink = currentPage > 1
  const showPreCurrentEllipsis = prePreviousIndex > 2
  const showPrePreviousPageLink = currentPage > 3
  const showPreviousPageLink = currentPage > 2
  const showNextPageLink = currentPage + 1 < totalPages
  const showPostNextPageLink = currentPage + 2 < totalPages
  const showPostCurrentEllipsis = postNextIndex < totalPages - 1
  const showLastPageLink = currentPage < totalPages

  return (
    <nav className={styles.paginator}>
      {
        currentPage > 1 &&
        <Link to={prevPagePath} className={[buttonStyles.button, styles.prev].join(' ')}>
          <ChevronLeft className={styles.icon} />
          <span className={styles.link_text}>Poprzednia</span>
        </Link>
      }

      {
        currentPage < totalPages &&
        <Link to={nextPagePath} className={[buttonStyles.button, styles.next].join(' ')}>
          <span className={styles.link_text}>Następna</span>
          <ChevronRight className={styles.icon}/>
        </Link>
      }
      
      <ol className={styles.page_list}>
        {
          showFirstPageLink &&
            generatePaginationLinkElement(firstPagePath, 1)
        }
        {
          showPreCurrentEllipsis &&
            ellipsisElement
        }
        {
          showPrePreviousPageLink &&
            generatePaginationLinkElement(prePreviousPagePath, prePreviousIndex)
        }

        {
          showPreviousPageLink &&
            generatePaginationLinkElement(prevPagePath, currentPage - 1)
        }

        <li className={[styles.page_nav_item, styles.current_page].join(' ')}>{ currentPage }</li>

        {
          showNextPageLink &&
            generatePaginationLinkElement(nextPagePath, currentPage + 1)
        }

        {
          showPostNextPageLink &&
            generatePaginationLinkElement(postNextPagePath, currentPage + 2)
        }

        {
          showPostCurrentEllipsis &&
            ellipsisElement
        }

        {
          showLastPageLink &&
            generatePaginationLinkElement(lastPagePath, totalPages)
        }
      </ol>

    </nav>
  )
}

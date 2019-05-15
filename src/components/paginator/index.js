import React from 'react'
import { Link } from 'gatsby'
import { calculatePages } from '../../utils/paginationHelper';
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

const generatePaginationLinkElement = (pageNumberText, requiresLink, isCurrent, subsectionPath, elementIndex) => {
  const listItemStyles = isCurrent
    ? [styles.page_nav_item, styles.current_page].join(' ')
    : styles.page_nav_item

  const elementContent = requiresLink
    ? <Link className={styles.page_link} to={generatePagePath(subsectionPath, pageNumberText)}>{pageNumberText}</Link>
    : pageNumberText

  const elementKey = pageNumberText !== '...'
    ? `page-${pageNumberText}`
    : `ellipsis-${elementIndex}`

  return (
    <li className={listItemStyles} key={elementKey}>
      { elementContent }
    </li>
  )
}

export default function Paginator ({currentPage, totalPages, currentPath}) {
  const subsectionPath = toSubsectionPath(currentPath)
  const nextPagePath = generatePagePath(subsectionPath, currentPage + 1)
  const prevPagePath = generatePagePath(subsectionPath, currentPage - 1)

  const pages =
    calculatePages(2, 2, currentPage, totalPages)
    .map((p, ndx) => generatePaginationLinkElement(p.displayText, p.requiresLink, p.isCurrent, subsectionPath, ndx))

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
        { pages }
      </ol>

    </nav>
  )
}

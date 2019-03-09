import React from 'react'
import { Link } from 'gatsby'
import styles from './paginator.module.sass'
import buttonStyles from '../button/button.transparent-noborder.module.sass'
import ChevronLeft from '../chevron-left'
import ChevronRight from '../chevron-right'

const removeTrailingSlash = (path) => path.replace(/\/$/, '')
const removePageNumberSegment = (path) => path.replace(/\/page\/\d+$/, '')

const toSubsectionPath = (path) => {
  const newPath = removeTrailingSlash(path)
  const subsectionPath = removePageNumberSegment(newPath)

  return subsectionPath == '' ? '/' : subsectionPath
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

export default function Paginator ({currentPage, totalPages, currentPath}) {
  const subsectionPath = toSubsectionPath(currentPath)
  const nextPagePath = generatePagePath(subsectionPath, currentPage + 1)
  const prevPagePath = generatePagePath(subsectionPath, currentPage - 1)

  return <nav className={styles.paginator}>
    {
      currentPage > 1 &&
      <Link to={prevPagePath} className={[buttonStyles.button, styles.prev].join(' ')}>
        <ChevronLeft className={styles.icon} />
        Poprzednia
      </Link>
    }

    {
      currentPage < totalPages &&
      <Link to={nextPagePath} className={[buttonStyles.button, styles.next].join(' ')}>
        Następna
        <ChevronRight className={styles.icon}/>
      </Link>
    }

    <span className={styles.current_page}>Strona {currentPage} z {totalPages}</span>
  </nav>
}

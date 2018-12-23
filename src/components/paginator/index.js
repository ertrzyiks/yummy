import React from 'react'
import { Link } from 'gatsby'
import styles from './paginator.module.css'

export default function Paginator ({currentPage, totalPages}) {
  const nextPagePath = `/page/${currentPage + 1}`
  const prevPagePath = currentPage === 2 ? `/` : `/page/${currentPage - 1}`

  return <nav className={styles.paginator}>
    {(currentPage > 1) ? <Link to={prevPagePath} className={styles.prev}>« poprzednia</Link> : null}
    {(currentPage < totalPages) ? <Link to={nextPagePath} className={styles.next}>następna »</Link> : null}
  </nav>
}

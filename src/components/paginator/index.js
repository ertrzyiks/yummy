import React from 'react'
import { Link } from 'gatsby'
import styles from './paginator.module.sass'
import buttonStyles from '../button/button.transparent-noborder.module.sass'
import ChevronLeft from '../chevron-left'
import ChevronRight from '../chevron-right'

export default function Paginator ({currentPage, totalPages}) {
  const nextPagePath = `/page/${currentPage + 1}`
  const prevPagePath = currentPage === 2 ? `/` : `/page/${currentPage - 1}`

  return <nav className={styles.paginator}>
    {(currentPage > 1) ? <Link to={prevPagePath} className={[buttonStyles.button, styles.prev].join(' ')}><ChevronLeft className={styles.icon} /> Poprzednia strona</Link> : null}
    {(currentPage < totalPages) ? <Link to={nextPagePath} className={[buttonStyles.button, styles.next].join(' ')}>Następna strona <ChevronRight className={styles.icon}/> </Link> : null}
  </nav>
}

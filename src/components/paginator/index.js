import React from 'react'
import { Link } from 'gatsby'
import styles from './paginator.module.sass'
import buttonStyles from '../button/button.transparent-noborder.module.sass'
import ChevronLeft from '../chevron-left'
import ChevronRight from '../chevron-right'

export default function Paginator ({currentPage, totalPages, subsection}) {
  const subsectionPath = subsection ? `/${subsection}` : ''
  const nextPagePath = `${subsectionPath}/page/${currentPage + 1}`
  const prevPagePath = currentPage === 2 ? `${subsectionPath}/` : `${subsectionPath}/page/${currentPage - 1}`

  return <nav className={styles.paginator}>
    {(currentPage > 1) ? <Link to={prevPagePath} className={[buttonStyles.button, styles.prev].join(' ')}><ChevronLeft className={styles.icon} /> Poprzednia</Link> : null}
    {(currentPage < totalPages) ? <Link to={nextPagePath} className={[buttonStyles.button, styles.next].join(' ')}>Następna <ChevronRight className={styles.icon}/> </Link> : null}
    <span className={styles.current_page}>Strona {currentPage} z {totalPages}</span>
  </nav>
}

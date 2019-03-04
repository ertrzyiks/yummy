import React from 'react'
import { Link } from 'gatsby'
import styles from './breadcrumbs.module.sass'

export default function Breadcrumbs({ subsectionName, subsectionSlug }) {
  return (
    <ol className={styles.breadcrumbs}>
      <li><Link to="/" className={styles.breadcrumb_link}>Strona Główna</Link></li>
      <li><Link to={`/${subsectionSlug}`} className={styles.breadcrumb_link}>{subsectionName}</Link></li>
    </ol>
  )
}

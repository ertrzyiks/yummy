import React from 'react'
import styles from './sidebar.module.css'

export default function SidebarSection({title, children}) {
  return <div className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
}

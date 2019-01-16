import React from 'react'
import styles from './footer.module.sass'

export default function Footer({className}) {
  return <footer className={[styles.footer, className].join(' ')}>
    <div className={styles.inner}>
      © 2018-2019 J. M. Derks
    </div>
  </footer>
}

import React from 'react'
import Navbar from '../navbar'
import Searchbar from '../searchbar'
import Logo from '../logo'
import { Link } from 'gatsby'
import styles from './header.module.sass'

export default function Header({fullVersion}) {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      {
        fullVersion !== false ? [
            <Link to='/' className={styles.logo_link} key={'logo'}>
              <Logo className={styles.logo} />
            </Link>,
          <Searchbar className={styles.searchbar} key={'searchbar'} />
        ] : null
      }
  </header>
  )
}

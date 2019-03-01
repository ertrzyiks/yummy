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
        fullVersion ? [
            <Link to='/' className={styles.logo_link}>
              <Logo className={styles.logo} key={'logo'}/>
            </Link>,
          <Searchbar className={styles.searchbar} key={'searchbar'} />
        ] : null
      }
  </header>
  )
}

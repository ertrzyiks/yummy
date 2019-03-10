import React from 'react'
import Navbar from '../navbar'
import Searchbar from '../searchbar'
import Logo from '../logo'
import { Link } from 'gatsby'
import styles from './header.module.sass'

export default class Header extends React.Component {
  state = {
    alreadyMounted: false
  }

  componentDidMount() {
    this.setState({ alreadyMounted: true })
  }

  render () {
    const { fullVersion, subsection } = this.props
    const { alreadyMounted } = this.state

    return (
      <header className={styles.header}>
        <div className={styles.navbar}>
          <Navbar hasHomepageLink={fullVersion === false}/>
        </div>

        {
          fullVersion !== false ? [
            <Link to='/' className={styles.logo_link} key={'logo'}>
              <Logo className={styles.logo}/>
            </Link>,
            <Searchbar forceVisibility={alreadyMounted} className={styles.searchbar} key={'searchbar'}/>
          ] : null
        }

        {
          subsection
            ? (
              <div className={styles.subsection_heading_wrapper}>
                <h2 className={styles.subsection_heading}>{subsection}</h2>
              </div>
            )
            : null
        }
      </header>
    )
  }
}

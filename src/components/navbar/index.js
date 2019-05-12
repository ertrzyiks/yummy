import React from 'react'
import { Link } from 'gatsby'
import Logo from '../icons/logo_simple'
import MenuBarsIcon from '../icons/menu_bars'
import MenuCloseIcon from '../icons/menu_close'
import styles from './navbar.module.sass'

function titleize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey)
  }

  handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      this.handleMenuCloseClick()
    }
  }

  handleMenuOpenClick = () => {
    document.addEventListener('keydown', this.handleEscapeKey)

    this.setState({
      menuOpen: true
    })
  }

  handleMenuCloseClick = () => {
    document.removeEventListener('keydown', this.handleEscapeKey)

    this.setState({
      menuOpen: false
    })
  }

  render() {
    const categoryMenuClass = this.state.menuOpen
      ? [styles.navbar_categories, styles.expanded].join(' ')
      : styles.navbar_categories

    const overlay = this.state.menuOpen ? (
        <div className={styles.navbar_menu_overlay} onClick={this.handleMenuCloseClick} />)
      : null;

    const {hasHomepageLink, categories} = this.props

    return (
      <nav className={styles.navbar}>
        <button className={[styles.navbar_menu_icon, this.state.menuOpen ? styles.hidden : ''].join(' ')}
           aria-label="Open category menu"
           onClick={this.handleMenuOpenClick}>
          <span aria-hidden="true">
            <MenuBarsIcon className={styles.icon_menu} />
          </span>
        </button>
        <button className={[styles.navbar_menu_icon, this.state.menuOpen ? '' : styles.hidden].join(' ')}
           aria-label="Close category menu"
           onClick={this.handleMenuCloseClick}>
          <span aria-hidden="true">
            <MenuCloseIcon className={styles.icon_menu} />
          </span>
        </button>
        <div className={categoryMenuClass}>
          {overlay}

          {hasHomepageLink &&
            <Link
              to={'/'}
              key={'homepage'}
              className={styles.navbar_logo_link}
              onClick={this.handleMenuCloseClick}
            >
              <Logo/>
            </Link>
          }

          {categories.map(({slug, name}) =>
           <Link
               to={`/${slug}`}
               key={slug}
               className={styles.navbar_link}
               onClick={this.handleMenuCloseClick}
             >
             {titleize(name)}
           </Link>
          )}
        </div>
    </nav>
    )
  }
}

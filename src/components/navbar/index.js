import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import MenuBarsIcon from '../menu_bars'
import MenuCloseIcon from '../menu_close'
import styles from './navbar.module.sass'

function titleize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  handleMenuOpenClick = (event) => {
    event.preventDefault()
    this.setState({
      menuOpen: true
    })
  }

  handleMenuCloseClick = (event) => {
    event.preventDefault()
    this.setState({
      menuOpen: false
    })
  }

  render() {
    const linkStyle = this.state.menuOpen
      ? [styles.navbar_link, styles.navbar_link_expanded].join(' ')
      : styles.navbar_link

    const overlay = this.state.menuOpen ? (
        <div className={styles.navbar_menu_overlay} onClick={this.handleMenuCloseClick} />)
      : null;

    return (
      <nav className={styles.navbar}>
        {overlay}
        <a className={[styles.navbar_menu_icon, this.state.menuOpen ? styles.hidden : ''].join(' ')}
           aria-label="Open category menu"
           onClick={this.handleMenuOpenClick}>
          <span aria-hidden="true">
            <MenuBarsIcon className={styles.icon_menu} />
          </span>
        </a>
        <a className={[styles.navbar_menu_icon, this.state.menuOpen ? '' : styles.hidden].join(' ')}
           aria-label="Close category menu"
           onClick={this.handleMenuCloseClick}>
          <span aria-hidden="true">
            <MenuCloseIcon className={styles.icon_menu} />
          </span>
        </a>
        <StaticQuery query={graphql`
        query LoadCategories {
          allRecipeCategory {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      `}
       render={data => (
         data.allRecipeCategory.edges.map(({node: {slug, name}}) => (
           <Link to={`/${slug}`} key={slug} className={linkStyle}>
             {titleize(name)}
           </Link>
         ))
       )} />
    </nav>
    )
  }
}

export default Navbar

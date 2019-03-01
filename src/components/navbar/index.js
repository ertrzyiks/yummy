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

  handleMenuOpenClick = () => {
    this.setState({
      menuOpen: true
    })
  }

  handleMenuCloseClick = () => {
    this.setState({
      menuOpen: false
    })
  }

  render() {
    console.log('render', this.state)
    const categoryMenuClass = this.state.menuOpen
      ? [styles.navbar_categories, styles.expanded].join(' ')
      : styles.navbar_categories

    const overlay = this.state.menuOpen ? (
        <div className={styles.navbar_menu_overlay} onClick={this.handleMenuCloseClick} />)
      : null;

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
             <Link
               to={`/${slug}`}
               key={slug}
               className={styles.navbar_link}
               onClick={this.handleMenuCloseClick}
             >
               {titleize(name)}
             </Link>
           ))
         )} />
        </div>
    </nav>
    )
  }
}

export default Navbar

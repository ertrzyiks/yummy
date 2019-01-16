import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Logo from '../logo'
import styles from './navbar.module.sass'

function titleize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Navbar() {
  return <nav className={styles.navbar}>
    <Link to='/' className={styles.navbar_logo_link}><Logo className={styles.navbar_logo}/></Link>

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
         <Link to={`/${slug}/`} key={slug} className={styles.navbar_text_link}>{titleize(name)}</Link>
       ))
     )} />
  </nav>
}

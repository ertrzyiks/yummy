import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import styles from './navbar.module.sass'

function titleize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Navbar() {
  return <nav className={styles.navbar}>
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
         <Link to={`/${slug}`} key={slug} className={styles.navbar_link}>{titleize(name)}</Link>
       ))
     )} />
  </nav>
}

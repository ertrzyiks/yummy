import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

export default function SiteCategories({render}) {
  return <StaticQuery query={graphql`
    query LoadCategories {
      allRecipeCategory (sort: { fields: [position] }) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `} render={data => render(data.allRecipeCategory.edges.map(({node}) => node))}
  />
}

import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import PostListContent from './post-list-content'

export default function PostListByCategoryPage({data, pageContext, location}) {
  const meta = (
    <Helmet>
      <meta name="description" content={`Kolekcja naszych ulubionych przepisów kulinarnych w kategorii: ${pageContext.category}`}></meta>
    </Helmet>
  )

  const pageInfo = {
    currentPage: pageContext.currentPage,
    totalPages: pageContext.totalPages
  }

  return (
    <PostListContent
      allRecipesData={data.allRecipe}
      pageInfo={pageInfo}
      meta={meta}
      location={location}
    />
  )
}

export const pageQuery = graphql`
  query blogListByCategoryQuery($category: String!, $skip: Int!, $limit: Int!) {
    allRecipe (
      filter: { category: { name: { eq: $category } } }
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...postForList
        }
      }
    }
  }
`

import React from 'react'
import { graphql } from 'gatsby'

import Page from './page'
import PostListContent from './post-list-content'

export default function PostListByTagPage({data, pageContext, location}) {
  const pageInfo = {
    currentPage: pageContext.currentPage,
    totalPages: pageContext.totalPages
  }

  return (
    <Page>
      <PostListContent
        allRecipesData={data.allRecipe}
        pageInfo={pageInfo}
        location={location}
      />
    </Page>
  )
}

export const pageQuery = graphql`
  query blogListByTagQuery($tag: String!, $skip: Int!, $limit: Int!) {
    allRecipe (
      filter: { tags: { in: [$tag] } }
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

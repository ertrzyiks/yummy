import React from 'react'
import { graphql } from 'gatsby'

import Page from './page'
import BlogPostListContent from './blog-post-list-content'

export default function BlogPostListPage({data, pageContext, location}) {
  const pageInfo = {
    currentPage: pageContext.currentPage,
    totalPages: pageContext.totalPages
  }

  return (
    <Page>
      <BlogPostListContent
        allPostsData={data.allPost}
        pageInfo={pageInfo}
        location={location}
      />
    </Page>
  )
}

export const query = graphql`
fragment blogPostForList on Post {
  id
  title
  slug
  published_at(formatString: "D MMM YYYY", locale: "pl")
  headline {
    childMarkdownRemark {
      html
    }
  }
}
`

export const pageQuery = graphql`
  query blogPostListQuery($skip: Int!, $limit: Int!) {
    allPost (
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...blogPostForList
        }
      }
    }
  }
`

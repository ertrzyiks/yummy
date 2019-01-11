import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostLink from '../components/post-card'
import Paginator from '../components/paginator'
import Sidebar from '../components/sidebar'
import styles from './page.module.css'

export default function PostListPage({data, pageContext}) {
  const Posts = data.allMarkdownRemark.edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <Layout>
    <div className={styles.layout}>
      <section className={styles.main}>
        {Posts}
        <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages}/>
      </section>

      <Sidebar className={styles.sidebar} />
    </div>
  </Layout>
}

export const query = graphql`
fragment postForList on MarkdownRemark {
  id
  excerpt
  fields {
    slug
  }
  frontmatter {
    title
    tags
    category
    date(formatString: "D MMM YYYY", locale: "pl")
    featured_image {
      childImageSharp {
        resize(width: 500) {
          src
        }
      }
    }
  }
}
`

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
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

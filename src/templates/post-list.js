import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostCard from '../components/post-card'
import Paginator from '../components/paginator'
import styles from './page.module.sass'

export default function PostListPage({data, pageContext}) {
  const Posts = data.allRecipe.edges
    .map(edge => <PostCard key={edge.node.id} post={edge.node} className={styles.single_post}/>)

  return <Layout fullHeaderVersion={true}>
    <div className={styles.layout}>
      <section className={styles.main}>
        <div className={styles.posts}>
          {Posts}
        </div>
        <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages}/>
      </section>
    </div>
  </Layout>
}

export const query = graphql`
fragment postForList on Recipe {
  id
  name
  headline { 
    childMarkdownRemark {
      html
    }
  }
  slug
  tags
  category
  required_time
  published_at(formatString: "D MMM YYYY", locale: "pl")
  featured_image {
    childImageSharp {
      fluid(maxWidth: 1000, traceSVG: { color: "#ec973b" }) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
}
`

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allRecipe (
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

import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import PostLink from '../components/post-card'
import Paginator from '../components/paginator'
import Sidebar from '../components/sidebar'
import styles from './page.module.sass'

export default function PostListByCategoryPage({data, pageContext}) {
  const Posts = data.allMarkdownRemark.edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <Layout>
    <Helmet>
      <meta name="description" content={`Kolekcja naszych ulubionych przepisów kulinarnych w kategorii: ${pageContext.category}`}></meta>
    </Helmet>

    <div className={styles.layout}>
      <section className={styles.main}>
        {Posts}
        <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages}/>
      </section>

      <Sidebar className={styles.sidebar} />
    </div>
  </Layout>
}

export const pageQuery = graphql`
  query blogListByCategoryQuery($category: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark (
      filter: { frontmatter: { category: { in: [$category] } } }
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

import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layout'
import PostLink from '../components/post-card'
import Paginator from '../components/paginator'
import styles from './page.module.sass'

export default function PostListByCategoryPage({data, pageContext}) {
  const Posts = data.allRecipe.edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} className={styles.single_post} />)

  return <Layout fullHeaderVersion={true}>
    <Helmet>
      <meta name="description" content={`Kolekcja naszych ulubionych przepisów kulinarnych w kategorii: ${pageContext.category}`}></meta>
    </Helmet>

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

export const pageQuery = graphql`
  query blogListByCategoryQuery($category: String!, $skip: Int!, $limit: Int!) {
    allRecipe (
      filter: { category: { in: [$category] } }
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

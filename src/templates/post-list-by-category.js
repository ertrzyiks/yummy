import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import PostCard from '../components/post-card'
import Paginator from '../components/paginator'
import styles from './page.module.sass'

export default function PostListByCategoryPage({data, pageContext, location}) {
  const Posts = data.allRecipe.edges
    .map((edge, index) => {
      return (
        <PostCard
          key={edge.node.id}
          post={edge.node}
          className={styles.single_post}
          criticalImage={index < 3}
        />
      )
    })

  return <div className={styles.layout}>
    <Helmet>
      <meta name="description" content={`Kolekcja naszych ulubionych przepisów kulinarnych w kategorii: ${pageContext.category}`}></meta>
    </Helmet>

    <section className={styles.main}>
      <div className={styles.posts}>
        {Posts}
      </div>
      <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages} currentPath={location.pathname} />
    </section>
  </div>
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

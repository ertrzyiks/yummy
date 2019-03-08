import React from 'react'
import { graphql } from 'gatsby'
import PostCard from '../components/post-card'
import Paginator from '../components/paginator'
import styles from './page.module.sass'

export default function PostListByTagPage({data, pageContext, location}) {
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
    <section className={styles.main}>
      <div className={styles.posts}>
        {Posts}
      </div>
      <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages} currentPath={location.pathname} />
    </section>
  </div>
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

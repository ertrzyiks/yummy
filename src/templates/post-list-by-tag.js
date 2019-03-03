import React from 'react'
import { graphql } from 'gatsby'
import PostLink from '../components/post-card'
import Paginator from '../components/paginator'
import styles from './page.module.sass'

export default function PostListByTagPage({data, pageContext}) {
  const Posts = data.allRecipe.edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} className={styles.single_post} />)

  return <div className={styles.layout}>
    <section className={styles.main}>
      <div className={styles.posts}>
        {Posts}
      </div>
      <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages}/>
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

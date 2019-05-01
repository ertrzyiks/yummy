import React from 'react'
import PostCard from '../components/post-card'
import Paginator from '../components/paginator'

import styles from './page.module.sass'

export default function PostListContent({allRecipesData, pageInfo, location}) {
  const Posts = allRecipesData.edges
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

  return (
    <div className={styles.layout}>
    <section className={styles.main}>
      <div className={styles.posts}>
        {Posts}
      </div>
      <Paginator currentPage={pageInfo.currentPage} totalPages={pageInfo.totalPages} currentPath={location.pathname} />
    </section>
  </div>
  )
}

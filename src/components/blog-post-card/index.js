import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg'

import styles from './blog-post-card.module.sass'

export default function BlogPostCard({post}) {

  return (
    <Link to={post.slug} className={styles.card}>
      <div className={styles.content_header}>
        <span className={styles.content_category}>blog</span>
        <h2 className={styles.content_title}>
          {post.title}
        </h2>
        <span className={styles.date_published}>
          {post.published_at}
        </span>
        <div className={styles.content_summary} dangerouslySetInnerHTML={ {__html: post.headline.childMarkdownRemark.html} } />
      </div>

      <span className={styles.show_more}>
        Czytaj dalej
        <ChevronRight className={styles.show_more_icon}/>
      </span>
    </Link>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import TimeToPrepare from '../time_to_prepare'
import styles from './post-card.module.sass'
import ChevronRight from '../chevron-right'

export default function PostCard({post, className}) {
  return <Link to={post.slug} className={[styles.card, className].join(' ')}>
    <div className={styles.cover_link}>
      <Img fluid={post.featured_image.childImageSharp.fluid} className={styles.cover}/>
    </div>

    <div className={styles.content_header}>
      <span className={styles.content_category}>{post.category}</span>
      <h2 className={styles.content_title}>
        {post.name}
      </h2>
      <div className={styles.content_summary} dangerouslySetInnerHTML={ {__html: post.headline.childMarkdownRemark.html} }></div>
    </div>

    <hr className={styles.separator} />

    <div className={styles.attributes}>
      <TimeToPrepare>{post.required_time}</TimeToPrepare>
    </div>

    <span className={styles.show_more}>
      Pokaż przepis
      <ChevronRight className={styles.show_more_icon}/>
    </span>
  </Link>
}

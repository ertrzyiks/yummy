import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import TimeToPrepare from '../time_to_prepare'
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg'
import { ReactComponent as VegetarianMark } from '../icons/vegetarian_mark.svg'

import styles from './post-card.module.sass'

export default function PostCard({post, className, criticalImage}) {

  return (
    <Link to={post.slug} className={[styles.card, className].join(' ')}>
      <div className={styles.cover_link}>
        <Img
          fluid={post.featured_image.childImageSharp.fluid}
          className={styles.cover}
          critical={criticalImage}
        />
      </div>

      <div className={styles.content_header}>
        <span className={styles.content_category}>{post.category.name}</span>
        <h2 className={styles.content_title}>
          {post.name}
        </h2>
        <div className={styles.content_summary} dangerouslySetInnerHTML={ {__html: post.headline.childMarkdownRemark.html} }></div>
      </div>

      <hr className={styles.separator} />

      <div className={styles.attributes}>
        <TimeToPrepare>{post.required_time}</TimeToPrepare>
        {
          post.tags.indexOf('wegetariańskie') !== -1
            && <VegetarianMark className={styles.vegetarian_icon} />
        }
      </div>

      <span className={styles.show_more}>
        Pokaż przepis
        <ChevronRight className={styles.show_more_icon}/>
      </span>
  </Link>
  )
}

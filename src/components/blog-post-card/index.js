import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import ChevronRight from '../icons/chevron-right'

export default function BlogPostCard({post, className, criticalImage}) {

  return (
    <Link to={post.slug}>
      {/*<div className={styles.cover_link}>*/}
        {/*<Img*/}
          {/*fluid={post.featured_image.childImageSharp.fluid}*/}
          {/*className={styles.cover}*/}
          {/*critical={criticalImage}*/}
        {/*/>*/}
      {/*</div>*/}

      <div>
        <span>BLOG</span>
        <h2>
          {post.title}
        </h2>
        {/*<div className={styles.content_summary} dangerouslySetInnerHTML={ {__html: post.headline.childMarkdownRemark.html} }></div>*/}
      {/*</div>*/}

      {/*<hr className={styles.separator} />*/}

      {/*<div className={styles.attributes}>*/}
        {/*<TimeToPrepare>{post.required_time}</TimeToPrepare>*/}
        {/*{*/}
          {/*post.tags.indexOf('wegetariańskie') !== -1*/}
          {/*&& <VegetarianMark className={styles.vegetarian_icon} />*/}
        {/*}*/}
      </div>

      <span>
        Pokaż wpis >
        {/*<ChevronRight/>*/}
      </span>
    </Link>
  )
}

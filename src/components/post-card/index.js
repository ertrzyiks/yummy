import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Tag from '../stackable_tag'
import styles from './post-card.module.sass'

function PostCardHeader({post}) {
  return <header className={styles.content_header}>
    <h2>
      <Link to={post.slug} className={styles.content_title}>{post.name}</Link>
    </h2>
    <span className={styles.content_date}>Dodano: {post.published_at}</span>
  </header>
}

function PostCardFooter({post}) {
  const Tags = (post.tags || []).map(tag => {
    return <Tag name={tag} key={tag} />
  })

  return <footer className={styles.footer}>
    {Tags}
  </footer>
}

export default function PostCard({post}) {
  return <article className={styles.card}>
    <div className={styles.inner}>
      <div className={styles.content}>
        <Link to={post.slug}  className={styles.cover_link} aria-label='A photo of the food'>
          <Img fluid={post.featured_image.childImageSharp.fluid} style={ {position: 'initial'} } className={styles.cover}/>
        </Link>

        <div className={styles.content_inner}>
         <PostCardHeader post={post}/>

          <div className={styles.content_summary}>
            <p dangerouslySetInnerHTML={ {__html: post.headline.childMarkdownRemark.html} } />
            <p>
              <Link to={post.slug} className={styles.show_more}>
                Pokaż przepis
              </Link>
            </p>
          </div>
        </div>
      </div>

      <PostCardFooter post={post}/>
    </div>
  </article>
}

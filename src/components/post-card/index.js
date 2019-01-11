import React from 'react'
import { Link } from 'gatsby'
import Tag from '../stackable_tag'
import styles from './post-card.module.css'

function PostCardHeader({post}) {
  return <header className={styles.content_header}>
    <h2>
      <Link to={post.fields.slug} className={styles.content_title}>{post.frontmatter.title}</Link>
    </h2>
    <span className={styles.content_date}>Dodano: {post.frontmatter.date}</span>
  </header>
}

function PostCardFooter({post}) {
  const Tags = post.frontmatter.tags.map(tag => {
    return <Tag name={tag} key={tag} />
  })

  return <footer className={styles.footer}>
    {Tags}
  </footer>
}

export default function PostCard({post}) {
  const coverImage = `url("${post.frontmatter.featured_image.childImageSharp.resize.src}")`
  return <article className={styles.card}>
    <div className={styles.inner}>
      <div className={styles.content}>
        <Link to={post.fields.slug} className={styles.cover} style={ {backgroundImage: coverImage} } aria-label='A photo of the food'></Link>

        <div className={styles.content_inner}>
         <PostCardHeader post={post}/>

          <div className={styles.content_summary}>
            <p>{post.excerpt}</p>
            <p>
              <Link to={post.fields.slug} className={styles.show_more}>
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

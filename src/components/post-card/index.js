import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Tag from '../stackable_tag'
import styles from './post-card.module.sass'

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
  console.log(post.frontmatter.title, typeof post.frontmatter.featured_image)

  return <article className={styles.card}>
    <div className={styles.inner}>
      <div className={styles.content}>
        <Link to={post.fields.slug}  className={styles.cover_link} aria-label='A photo of the food'>
          <Img fluid={post.frontmatter.featured_image.childImageSharp.fluid} style={ {position: 'initial'} } className={styles.cover}/>
        </Link>

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

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Tag from '../components/stackable_tag'
import pageStyles from './page.module.css'
import postStyles from './post.module.css'

function PostCardFooter({post}) {
  const Tags = post.frontmatter.tags.map(tag => {
    return <Tag name={tag} key={tag} />
  })

  return <footer className={postStyles.footer}>
    {Tags}
  </footer>
}

export default function Template({data}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <header className={postStyles.header}>
        <img
          src={frontmatter.featured_image.childImageSharp.big.src}
          srcSet={`${frontmatter.featured_image.childImageSharp.small.src} 1000w, ${frontmatter.featured_image.childImageSharp.big.src} 2000w`}
          alt={'Photography of the food from the recipe.'}
          className={postStyles.coverImage}
        />
      </header>

      <div className={postStyles.wrapper}>
        <div className={pageStyles.layout}>
          <section className={pageStyles.main}>
            <article className={postStyles.post}>
              <h1>{frontmatter.title}</h1>
              <p>Dodano: {frontmatter.date}</p>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <PostCardFooter post={markdownRemark}/>
            </article>
          </section>

          <Sidebar className={pageStyles.sidebar} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        tags
        category
        date(formatString: "D MMM YYYY", locale: "pl")
        featured_image {
          childImageSharp {
            big: resize(width: 2000) {
              src
            }
            small: resize(width: 1000) {
              src
            }
          }
        }
      }
    }
  }
`

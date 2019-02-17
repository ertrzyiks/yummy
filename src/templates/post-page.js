import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Sidebar from '../components/sidebar'
import Tag from '../components/stackable_tag'
import pageStyles from './page.module.sass'
import postStyles from './post.module.sass'

function PostCardFooter({post}) {
  const Tags = (post.tags || []).map(tag => {
    return <Tag name={tag} key={tag} />
  })

  return <footer className={postStyles.footer}>
    {Tags}
  </footer>
}

export default function Template({data}) {
  const { recipe } = data
  const html = recipe.headline.childMarkdownRemark.html +
               recipe.ingredients.childMarkdownRemark.html +
               recipe.directions.childMarkdownRemark.html

  return (
    <Layout footerProps={ {className: postStyles.page_block} }>
      <header className={postStyles.header}>
        <Img
          fluid={recipe.featured_image.childImageSharp.fluid}
          alt={'Photography of the food from the recipe.'}
          className={postStyles.coverImage}
        />
      </header>

      <div className={postStyles.wrapper}>
        <div className={pageStyles.layout}>
          <section className={pageStyles.main}>
            <article className={postStyles.post}>
              <h1>{recipe.name}</h1>
              <p>Dodano: {recipe.published_at}</p>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html}}
              />

              <PostCardFooter post={recipe}/>
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
    recipe(slug: { eq: $slug }) {
      headline {
        childMarkdownRemark {
          html
        }
      }
      directions {
        childMarkdownRemark {
          html
        }
      }
      ingredients {
        childMarkdownRemark {
          html
        }
      }
      slug
      name
      tags
      category
      published_at(formatString: "D MMM YYYY", locale: "pl")
      featured_image {
        childImageSharp {
          fluid(maxWidth: 2000, traceSVG: { color: "#e98500" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  }
`

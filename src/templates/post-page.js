import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import TimeToPrepare from '../components/time_to_prepare'
import pageStyles from './page.module.sass'
import postStyles from './post.module.sass'
import {button as buttonClass} from '../components/button/button.transparent.module.sass'

export default function Template({data}) {
  const { recipe } = data

  const Tags = (recipe.tags || []).map(tag => {
    return <Link to={'/tag/' + tag} key={tag} className={[buttonClass, postStyles.post_tag].join(' ')}>{tag}</Link>
  })

  return (
    <Layout footerProps={ {className: postStyles.page_block} }>
      <div className={pageStyles.layout}>
        <section className={pageStyles.main}>
          <article className={postStyles.post}>
            <div className={postStyles.post_intro}>
              <div className={postStyles.post_preamble}>
                <span className={postStyles.post_category}>{recipe.category}</span>
                <TimeToPrepare>{recipe.required_time}</TimeToPrepare>
              </div>

              <h1 className={postStyles.post_title}>{recipe.name}</h1>

              <p className={postStyles.post_headline} dangerouslySetInnerHTML={{ __html: recipe.headline.childMarkdownRemark.html }}></p>

              <div className={postStyles.post_tags}>
                {Tags}
              </div>
            </div>

            <Img
              fluid={recipe.featured_image.childImageSharp.fluid}
              alt={'Photography of the food from the recipe.'}
              className={postStyles.coverImage}
            />

            <div className={postStyles.post_body}>
              <div
                className={postStyles.post_ingredients}
                dangerouslySetInnerHTML={{ __html: recipe.ingredients.childMarkdownRemark.html }}
              />
              <div
                className={postStyles.post_directions}
                dangerouslySetInnerHTML={{ __html: recipe.directions.childMarkdownRemark.html}}
              />
            </div>
          </article>
        </section>
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
      required_time
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

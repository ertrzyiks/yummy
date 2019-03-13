import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import slugify from 'underscore.string/slugify'
import TimeToPrepare from '../components/time_to_prepare'
import Breadcrumbs from '../components/breadcrumbs'
import pageStyles from './page.module.sass'
import postStyles from './post.module.sass'
import {button as buttonClass} from '../components/button/button.transparent.module.sass'

export default function Template({data}) {
  const { recipe } = data

  const Tags = (recipe.tags || []).map(tag => {
    const slug = slugify(tag)
    return <Link to={'/tag/' + slug} key={tag} className={[buttonClass, postStyles.post_tag].join(' ')}>{tag}</Link>
  })

  return <div className={pageStyles.layout}>
    <Helmet>
      <title>{recipe.html_title}</title>
      <meta name="description" content={recipe.html_description}/>
      <meta property="og:image" content={recipe.featured_image.childImageSharp.fluid.src} />
    </Helmet>

    <section className={pageStyles.main}>
      <article className={postStyles.post}>
        <div className={postStyles.post_intro}>
          <div className={postStyles.post_preamble}>
            <Breadcrumbs subsectionName={recipe.category.name} subsectionSlug={recipe.category.slug}/>
            <TimeToPrepare>{recipe.required_time}</TimeToPrepare>
          </div>

          <h1 className={postStyles.post_title}>{recipe.name}</h1>

          <div className={postStyles.post_headline} dangerouslySetInnerHTML={{ __html: recipe.headline.childMarkdownRemark.html }}></div>

          <div className={postStyles.post_tags}>
            {Tags}
          </div>
        </div>

        <Img
          fluid={recipe.featured_image.childImageSharp.fluid}
          alt={'Photography of the food from the recipe.'}
          className={postStyles.cover_image}
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
      html_title
      html_description
      tags
      required_time
      category {
        name
        slug
      }
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

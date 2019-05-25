import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Page from '../page'
import Breadcrumbs from '../../components/breadcrumbs'

import SiteMetadata from '../../components/site_metadata'

import pageStyles from '../page.module.sass'
import postStyles from './blog-post.module.sass'

export default function BlogPostPage({data}) {
  const { post } = data

  console.log('POST', post)

  // TODO: should it be setting all of this meta data? Some of it lives within the Page element itself
  return (
    <Page>
      <div className={pageStyles.layout}>
        <SiteMetadata render={({siteUrl}) =>
          <Helmet>
            <title>{post.html_title}</title>
            <meta name='description' content={post.html_title}/>
            {/*<meta property='og:image' content={siteUrl + post.featured_image.childImageSharp.fluid.src} />*/}
            <meta property='og:type' content='article' />
            <meta property='article:section' content='blog' />
            {/*{(recipe.tags || []).map((tag, index) => <meta property='article:tag' content={tag} key={index}/>)}*/}
          </Helmet>
        } />

        <section className={pageStyles.main}>
          <article className={postStyles.post}>

            <div className={postStyles.post_intro}>
              <div className={postStyles.post_navigation}>
                <Breadcrumbs subsectionName='blog' subsectionSlug='blog'/>
              </div>

              <h1 className={postStyles.post_title}>{post.title}</h1>

              {/*TODO: can be a component since it's used on both pages*/}
              <span className={postStyles.date_published}>
                {post.published_at}
              </span>

              <div className={postStyles.post_headline} dangerouslySetInnerHTML={{ __html: post.headline.childMarkdownRemark.html }}></div>

              {/*<div className={postStyles.post_tags}>*/}
                {/*{Tags}*/}
              {/*</div>*/}
            </div>

            {/* Optionally an image somewhere here or to the side */}

            <div className={postStyles.post_body}>
              <div dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }}></div>

            </div>
          </article>
        </section>
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }) {
      headline {
        childMarkdownRemark {
          html
        }
      }
      content {
        childMarkdownRemark {
            html
          }
      }
      slug
      title
      published_at(formatString: "D MMM YYYY", locale: "pl")
    }
  }
`

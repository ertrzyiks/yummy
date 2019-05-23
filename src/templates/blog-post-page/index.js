import React from 'react'
import { graphql, Link } from 'gatsby'
import Page from '../page'

export default function PostPage({data}) {
  const { post } = data

  return <Page>
    <div >

      <section>
        <article>
          <div>

            <h1>{post.title}</h1>

            <div dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }}></div>

          </div>
        </article>
      </section>
    </div>
  </Page>
}

export const pageQuery = graphql`
  query($slug: String!) {
    post(slug: { eq: $slug }) {
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

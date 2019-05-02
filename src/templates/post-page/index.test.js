import React from 'react'
import {render, cleanup} from 'react-testing-library'
import {Helmet} from 'react-helmet'
import {StaticQuery} from 'gatsby'

import PostPage from './index'

describe('PostPage', () => {
  afterEach(cleanup)

  it('provides meta tags overrides', () => {
    StaticQuery.mockImplementation(({ render }) =>
      render({site: {siteMetadata: {siteUrl: 'http://localhost.test'}}})
    )

    const recipe = {
      html_title: 'Recipe title',
      html_description: 'Recipe description',
      tags: ['tag1', 'tag2'],
      category: { name: 'Category Name' },
      headline: {childMarkdownRemark: {html: 'Lorem ipsum'}},
      ingredients: {childMarkdownRemark: {html: 'Lorem ipsum'}},
      directions: {childMarkdownRemark: {html: 'Lorem ipsum'}},
      featured_image: {
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            src: '/cover.jpg',
            srcSet: '',
            sizes: ''
          }
        }
      }
    }

    const data = {recipe}

    render(<PostPage data={data} />)

    const helmet = Helmet.peek()

    expect(helmet.title).toEqual('Recipe title')
    expect(helmet.metaTags).toContainEqual({name: 'description', content: 'Recipe description'})
    expect(helmet.metaTags).toContainEqual({property: 'og:type', content: 'article'})
    expect(helmet.metaTags).toContainEqual({property: 'article:section', content: 'Category Name'})
    expect(helmet.metaTags).toContainEqual({property: 'article:tag', content: 'tag1'})
    expect(helmet.metaTags).toContainEqual({property: 'article:tag', content: 'tag2'})
    expect(helmet.metaTags).toContainEqual({property: 'og:image', content: 'http://localhost.test/cover.jpg'})
  })
})

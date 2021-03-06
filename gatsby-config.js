const {JSDOM} = require('jsdom')

const localPlugins = [
  'gatsby-yummy-categories',
  'gatsby-yummy-recipes',
  'gatsby-yummy-posts',
  'gatsby-yummy-pages',
  'gatsby-yummy-search-data',
]

function getSourcePlugins() {
  switch (process.env.GATSBY_SOURCE) {
    case 'test':
      return [
        'gatsby-source-fixtures',
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/cypress/fixtures/recipes`,
            name: 'recipes',
          },
        },
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/cypress/fixtures/posts`,
            name: 'posts',
          },
        },
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/cypress/fixtures/images`,
            name: 'images',
          },
        }
      ]
    case 'mini':
      return [
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/../mini-yummy-content/recipes`,
            name: 'recipes',
          },
        }, {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/../mini-yummy-content/posts`,
            name: 'posts',
          },
        }, {
          resolve: 'gatsby-plugin-webpack-bundle-analyzer',
          options: {
            analyzerPort: 3005,
            openAnalyzer: false
          }
        }
      ]

    default:
      return [
        {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/../yummy-content/recipes`,
            name: 'recipes',
          },
        }, {
          resolve: 'gatsby-source-filesystem',
          options: {
            path: `${__dirname}/../yummy-content/posts`,
            name: 'posts',
          },
        }, {
          resolve: 'gatsby-plugin-webpack-bundle-analyzer',
          options: {
            analyzerPort: 3005,
            openAnalyzer: false
          }
        }
      ]
  }
}
const sourcePlugins = getSourcePlugins()

const typographyPlugins = process.env.GATSBY_SOURCE === 'test' ? [
  {
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: 'src/utils/typography.fixed_face.js',
    },
  }
] : [
  {
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: 'src/utils/typography.js',
    },
  }
]

// Enable analytics on in production
const analyticsPlugins = process.env.GATSBY_SOURCE === 'test' ? [] : [
  {
    resolve: 'gatsby-plugin-fathom',
    options: {
      trackingUrl: 'fathom.ertrzyiks.me',
      siteId: 'YSCGJ'
    }
  }
]

const dynamicPlugins = localPlugins
  .concat(sourcePlugins)
  .concat(typographyPlugins)
  .concat(analyticsPlugins)

module.exports = {
  siteMetadata: {
    title: 'Yummy',
    description: 'Searchable repository of recipes we frequently use and are yummy.',
    siteUrl: 'https://kuchnia-yummy.pl',
    author: 'J. M. Derks'
  },
  plugins: dynamicPlugins.concat([
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-svgr',
    {
      'resolve': 'gatsby-transformer-remark',
      'options': {
        'excerpt_separator': '<!-- more -->'
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allRecipe } }) => {
              return allRecipe.edges.map(edge => {
                return {
                  title: edge.node.name,
                  description: JSDOM.fragment(edge.node.headline.childMarkdownRemark.html).textContent,
                  date: edge.node.published_at,
                  url: site.siteMetadata.siteUrl + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.slug
                }
              })
            },
            query: `
            {
              allRecipe(
                limit: 1000,
                sort: { order: DESC, fields: [published_at] }
              ) {
                edges {
                  node {
                    headline { 
                      childMarkdownRemark {
                        html
                      }
                    }
                    slug
                    name
                    published_at
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'Yummy RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Yummy',
        short_name: 'Yummy',
        start_url: '/',
        background_color: '#ec973b',
        theme_color: '#ec973b',
        display: 'standalone',
        icon: 'src/components/layout/assets/android-chrome-192x192.png',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-eslint'
  ],
  )
}

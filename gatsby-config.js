const {JSDOM} = require('jsdom')

const localPlugins = [
  `gatsby-yummy-categories`,
  `gatsby-yummy-search-data`,
]

const sourcePlugins = process.env.GATSBY_SOURCE === 'test' ? [
  `gatsby-source-fixtures`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/cypress/fixtures`,
      name: 'recipes',
    },
  }
] : [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/recipes`,
      name: 'recipes',
    },
  }
]

module.exports = {
  siteMetadata: {
    title: 'Yummy',
    description: 'Searchable repository of recipes we frequently use and are yummy.',
    siteUrl: 'https://yummy.ertrzyiks.me',
    author: 'Author Name'
  },
  plugins: localPlugins.concat(sourcePlugins).concat([
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      "resolve": `gatsby-transformer-remark`,
      "options": {
        "excerpt_separator": `<!-- more -->`
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-feed`,
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
            output: "/rss.xml",
            title: "Yummy RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Yummy",
        short_name: "Yummy",
        start_url: "/",
        background_color: "#ec973b",
        theme_color: "#ec973b",
        display: "standalone",
        icon: "src/components/layout/assets/android-chrome-192x192.png",
      },
    },
    `gatsby-plugin-sass`,
  ],
  )
}

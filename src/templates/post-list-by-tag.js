import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PostLink from '../components/post-card'
import Paginator from '../components/paginator'
import Sidebar from '../components/sidebar'
import SearchBar from '../components/searchbar'
import styles from './page.module.sass'

export default function PostListByTagPage({data, pageContext}) {
  const Posts = data.allMarkdownRemark.edges
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <Layout>
    <div className={styles.layout}>
      <section className={styles.main}>
        <SearchBar className={styles.main_searchbar} />

        {Posts}
        <Paginator currentPage={pageContext.currentPage} totalPages={pageContext.totalPages}/>
      </section>

      <Sidebar className={styles.sidebar} />
    </div>
  </Layout>
}

export const pageQuery = graphql`
  query blogListByTagQuery($tag: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark (
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...postForList
        }
      }
    }
  }
`

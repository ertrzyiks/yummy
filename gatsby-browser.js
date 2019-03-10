import React from 'react'
import Layout from './src/components/layout'

export const wrapPageElement = ({ element, props }) => {
  const {pageContext} = props

  return <Layout fullHeaderVersion={pageContext.fullHeaderVersion} subsection={pageContext.category || pageContext.tag}>{element}</Layout>
}

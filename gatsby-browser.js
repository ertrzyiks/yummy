import React from 'react'
import Layout from './src/components/layout'

export const wrapPageElement = ({ element, props }) => {
  const {pageContext: {fullHeaderVersion, subsection, isSingleRecipe}} = props

  if (props.custom404) {
    return element
  }

  return (
    <Layout
      fullHeaderVersion={fullHeaderVersion}
      subsection={subsection}
      isSingleRecipe={isSingleRecipe}
    >
      {element}
    </Layout>
  )
}

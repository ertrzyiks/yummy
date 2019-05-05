import React from 'react'
import Header from '../header'
import Footer from '../footer'
import SiteCategories from '../site_categories'

import './layout.sass'

const HeaderWithCategories = ({fullVersion, subsection, isSingleRecipe}) => (
  <SiteCategories render={categories =>
    <Header
      categories={categories}
      fullVersion={fullVersion}
      subsection={subsection}
      isSingleRecipe={isSingleRecipe}
    />
  }/>
)

export default function Layout({children, fullHeaderVersion, subsection, isSingleRecipe}) {
  return (
    <div>
      <HeaderWithCategories
        fullVersion={fullHeaderVersion}
        subsection={subsection}
        isSingleRecipe={isSingleRecipe}
      />

      {children}
      <Footer />
    </div>
  )
}

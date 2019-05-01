import React from 'react'
import Header from '../header'
import Footer from '../footer'

import './layout.sass'

export default function Layout({children, fullHeaderVersion, subsection, isSingleRecipe}) {
  return <div>
    <Header
      fullVersion={fullHeaderVersion}
      subsection={subsection}
      isSingleRecipe={isSingleRecipe}
    />

    {children}
    <Footer />
  </div>
}

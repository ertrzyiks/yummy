import React from 'react'
import DefaultMeta from './meta'
import Header from '../header'
import Footer from '../footer'

import './layout.sass'

export default function Layout({children, fullHeaderVersion, subsection}) {
  return <div>
    <DefaultMeta />

    <Header fullVersion={fullHeaderVersion} subsection={subsection}/>

    {children}
    <Footer />
  </div>
}

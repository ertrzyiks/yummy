import React from 'react'
import DefaultMeta from './meta'
import Header from '../header'
import Footer from '../footer'

import './layout.sass'

export default function Layout({children, footerProps, fullHeaderVersion}) {
  return <div>
    <DefaultMeta />

    <Header fullVersion={fullHeaderVersion}/>

    {children}
    <Footer {...footerProps} />
  </div>
}

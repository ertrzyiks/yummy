import React from 'react'
import DefaultMeta from './meta'
import Navbar from '../navbar'
import Footer from '../footer'

import './layout.sass'

export default function Layout({children, footerProps}) {
  return <div>
    <DefaultMeta />

    <Navbar />
    {children}
    <Footer {...footerProps} />
  </div>
}

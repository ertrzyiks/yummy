import React from 'react'
import DefaultMeta from './meta'
import Navbar from '../navbar'
import Footer from '../footer'

import './layout.css'

export default function Layout({children}) {
  return <div>
    <DefaultMeta />

    <Navbar />
    {children}
    <Footer />
  </div>
}

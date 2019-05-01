import React from 'react'
import { Helmet } from 'react-helmet'
import SiteMetadata from '../components/site_metadata'

import favicon16 from '../components/layout/assets/favicon-16x16.png'
import favicon32 from '../components/layout/assets/favicon-32x32.png'
import appleTouchIcon from '../components/layout/assets/apple-touch-icon.png'
import safariPinnedTab from '../components/layout/assets/safari-pinned-tab.svg'
import defaultOgImage from '../components/layout/assets/default_og_image.jpg'

export default function Page({children}) {
  return <React.Fragment>
    <SiteMetadata render={({siteUrl}) =>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang="pl" />
        <title>Yummy</title>
        <meta name='description' content='Kolekcja naszych ulubionych przepisów kulinarnych.' />
        <meta name='theme-color' content='#ec973b' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16} />
        <link rel="mask-icon" href={safariPinnedTab} color="#ec973b" />

        <meta name="twitter:card" content="summary" />
        <meta property="og:image" content={siteUrl + defaultOgImage} />
      </Helmet>
    }/>

    {children}
  </React.Fragment>
}

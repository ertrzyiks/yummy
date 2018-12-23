import React from 'react'
import { Helmet } from 'react-helmet'

import favicon16 from './assets/favicon-16x16.png'
import favicon32 from './assets/favicon-32x32.png'
import appleTouchIcon from './assets/apple-touch-icon.png'
import safariPinnedTab from './assets/safari-pinned-tab.svg'

export default function DefaultMeta() {
  return <Helmet>
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
  </Helmet>
}

import React from 'react'
import { storiesOf } from '@storybook/react'

import Gallery from '../components/gallery'

const images = [
  {'childImageSharp':{'fluid':{'aspectRatio':0.75,'src':'https://raw.githubusercontent.com/ertrzyiks/yummy/master/recipes/desery/biszkopt-z-truskawkami-galaretka/cover.jpg','sizes':'(max-width: 500px) 100vw, 500px'}}},
  {'childImageSharp':{'fluid':{'aspectRatio':0.75,'src':'https://raw.githubusercontent.com/ertrzyiks/yummy/master/recipes/desery/placek-drozdzowy-z-truskawkami/cover.jpg','sizes':'(max-width: 500px) 100vw, 500px'}}}
]

storiesOf('Gallery', module)
  .add('default', () => (
    <Gallery images={images}/>
  ))
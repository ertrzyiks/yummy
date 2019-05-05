import React from 'react'
import { storiesOf } from '@storybook/react'

import Header from '../components/header'

const categories = [
  {name: 'Category1', slug: 'category1'},
  {name: 'Category2', slug: 'category2'}
]

storiesOf('Header', module)
  .add('full header', () => (
    <Header categories={categories} fullVersion={true} />
  ))
  .add('header on subsection', () => (
    <Header categories={categories} fullVersion={false} subsection='obiady' />
  ))
  .add('header on a recipe page', () => (
    <Header categories={categories} fullVersion={false} isSingleRecipe={true} />
  ))

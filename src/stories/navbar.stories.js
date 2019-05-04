import React from 'react'
import { storiesOf } from '@storybook/react'

import Navbar from '../components/navbar'

const categories = [
  {name: 'Category1', slug: 'category1'},
  {name: 'Category2', slug: 'category2'},
  {name: 'Category3', slug: 'category3'}
]

const BackgroundDecorator = storyFn => <div style={{backgroundColor: '#e98500'}}>{storyFn()}</div>;

storiesOf('Navbar', module)
  .addDecorator(BackgroundDecorator)
  .add('default', () => (
    <Navbar categories={categories} />
  ))
  .add('with homepage link', () => (
    <Navbar categories={categories} hasHomepageLink={true}/>
  ))

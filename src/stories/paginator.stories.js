import React from 'react'
import { storiesOf } from '@storybook/react'

import Paginator from '../components/paginator'

storiesOf('Paginator', module)
  .add('on the first page', () => (
    <Paginator currentPage={1} totalPages={4} currentPath='/'/>
  ))
  .add('on a middle page', () => (
    <Paginator  currentPage={2} totalPages={4} currentPath='/'/>
  ))
  .add('on the last page', () => (
    <Paginator currentPage={4} totalPages={4} currentPath='/'/>
  ))
  .add('on the only page', () => (
    <Paginator currentPage={1} totalPages={1} currentPath='/'/>
  ))
  .add('on the main page', () => (
    <Paginator currentPage={2} totalPages={4} currentPath='/' />
  ))
  .add('on a category page', () => (
    <Paginator currentPage={2} totalPages={4} currentPath='/obiady' />
  ))
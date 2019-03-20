import React from 'react'
import { storiesOf } from '@storybook/react'

import Header from '../components/header'

storiesOf('Header', module)
  .add('full header', () => (
    <Header fullVersion={true} />
  ))
  .add('header on subsection', () => (
    <Header fullVersion={false} subsection='obiady' />
  ))
  .add('header on a recipe page', () => (
    <Header fullVersion={false} isSingleRecipe={true} />
  ))
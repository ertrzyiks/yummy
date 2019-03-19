import React from 'react'
import { storiesOf } from '@storybook/react'

import Breadcrumbs from '../components/breadcrumbs'

storiesOf(`Breadcrumbs`, module)
  .add(`default`, () => (
    <Breadcrumbs subsectionName="desery" subsectionSlug="desery" />
  ))
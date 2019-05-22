import React from 'react'
import { storiesOf } from '@storybook/react'

import Tag from '../components/tag'

storiesOf('Tag', module)
  .add('default', () => (
    <Tag name="Sample Tag" />
  ))

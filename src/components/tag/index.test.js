import React from 'react'
import {render, cleanup} from 'react-testing-library'

import Tag from './index'

describe('Tag', () => {
  afterEach(cleanup)

  it('renders link with a titleized text and slugified url', () => {
    const {getByText} = render(<Tag name='sample name' />)

    expect(getByText('Sample Name').getAttribute('href')).toEqual('/tag/sample-name')
  })
})

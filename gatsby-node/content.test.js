import {split} from './content'

describe('Content util', () => {
  it('splits content into sections', () => {
    const results = split(`
      This is example content
      <!---- splitter ---->
      Split into sections
      <!---- splitter ---->
      And this is awesome
    `)

    expect(results.length).toEqual(3)
    expect(results[0]).toEqual('This is example content')
    expect(results[1]).toEqual('Split into sections')
    expect(results[2]).toEqual('And this is awesome')
  })
})

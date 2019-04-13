import {RecentSearchesCache} from './recent'

export class MemoryStorageClient {
  constructor() {
    this.data = []
  }

  save (data) { this.data = data }
  load () { return this.data }
}

describe('RecentSearchesCache', () => {
  const createCache = () => {
    return new RecentSearchesCache({
      storage: new MemoryStorageClient(),
      historySize: 3
    })
  }

  it('remembers an item', () => {
    const cache = createCache()

    expect(cache.getRecentOptions()).toEqual([])
    cache.rememberSelectedOption({label: 'Test', value: '123'})
    expect(cache.getRecentOptions()).toEqual([{label: 'Test', value: '123'}])
  })

  it('limits the history size', () => {
    const cache = createCache()

    cache.rememberSelectedOption({label: 'Test A', value: 'A'})
    cache.rememberSelectedOption({label: 'Test B', value: 'B'})
    cache.rememberSelectedOption({label: 'Test C', value: 'C'})
    cache.rememberSelectedOption({label: 'Test D', value: 'D'})
    expect(cache.getRecentOptions().length).toEqual(3)
  })

  it('puts the new item on the first place', () => {
    const cache = createCache()

    cache.rememberSelectedOption({label: 'Test A', value: 'A'})
    cache.rememberSelectedOption({label: 'Test B', value: 'B'})
    cache.rememberSelectedOption({label: 'Test C', value: 'C'})
    expect(cache.getRecentOptions()[0]).toEqual({label: 'Test C', value: 'C'})
  })

  it('does not duplicate items', () => {
    const cache = createCache()

    cache.rememberSelectedOption({label: 'Test A', value: 'A'})
    cache.rememberSelectedOption({label: 'Test B', value: 'B'})
    cache.rememberSelectedOption({label: 'Test C', value: 'C'})
    cache.rememberSelectedOption({label: 'Test B', value: 'B'})

    expect(cache.getRecentOptions()).toEqual([
      {label: 'Test B', value: 'B'},
      {label: 'Test C', value: 'C'},
      {label: 'Test A', value: 'A'}
    ])
  })
})

// Keeps history in localStorage if available
export class LocalStorageClient {
  constructor({name}) {
    this.name = name
    this.data = this.fetch()
  }

  save (data) {
    this.data = data

    try {
      window.localStorage.setItem(this.name, JSON.stringify(data))
    }
    catch (ex) {
      // localStorage is not available, we don't use any fallback storage
    }
  }

  load () { return this.data }

  fetch() {
    try {
      const stored = window.localStorage.getItem(this.name)
      return JSON.parse(stored)
    }
    catch (ex) {
      // localStorage is not available or the stored value is not a valid JSON
      // We can't recover from either of them
    }
  }
}

/**
 * Provides a mechanism to store last N choices from the search.
 * When item is added to the cache, it is put on the first place.
 * It's FIFO - when Nth+1 item is added, the first item is removed from the cache.
 */
export class RecentSearchesCache {
  constructor({storage, historySize}) {
    this.storage = storage
    this.historySize = historySize
  }

  getRecentOptions() {
    const value = this.storage.load()
    if (Array.isArray(value) && value.every(item => this.isItemValid(item))) {
      return value
    }

    return []
  }

  rememberSelectedOption({value, label}) {
    const oldOptions = this.getRecentOptions().filter(item => item.value !== value)
    oldOptions.unshift({value, label})

    const newOptions = oldOptions.slice(0, this.historySize)

    this.storage.save(newOptions)
  }

  isItemValid(item) {
    return item && typeof item.label === 'string' && typeof item.value === 'string'
  }
}

import data from  '../../../data.json'
import * as Fuse from 'fuse.js'

const LIMIT = 5

var fuse = new Fuse(data.pages, {
  keys: ['title'],
  tokenize: true,
  matchAllTokens: true,
  shouldSort: true,
  minMatchCharLength: 1,
  maxPatternLength: 32,
  threshold: 0.5,
  distance: 10
})

export default function localSearch(term) {
  return fuse.search(term).slice(0, LIMIT).map(page => {
    return {
      value: page.path,
      label: page.title
    }
  })
}

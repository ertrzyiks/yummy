import {calculatePages} from './paginationHelper'
import { paginationElementTypes } from './paginationConsts';

describe('Pagination helper - calculatePages', () => {

  it('returns a full range of pages with both ellipses', () => {
    const pages = calculatePages(2, 3, 7, 15)

    expect(pages.length).toEqual(10)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({ type: paginationElementTypes.SEPARATOR })
    expect(pages[2]).toEqual({pageNumber: 5, type: paginationElementTypes.PAGE})
    expect(pages[3]).toEqual({pageNumber: 6, type: paginationElementTypes.PAGE})
    expect(pages[4]).toEqual({pageNumber: 7, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[5]).toEqual({pageNumber: 8, type: paginationElementTypes.PAGE})
    expect(pages[6]).toEqual({pageNumber: 9, type: paginationElementTypes.PAGE})
    expect(pages[7]).toEqual({pageNumber: 10, type: paginationElementTypes.PAGE})
    expect(pages[8]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[9]).toEqual({pageNumber: 15, type: paginationElementTypes.PAGE})
  })

  it('skips the previous ellipsis if not required', () => {
    const pages = calculatePages(2, 2, 3, 7)

    expect(pages.length).toEqual(7)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({pageNumber: 2, type: paginationElementTypes.PAGE})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.CURRENT_PAGE })
    expect(pages[3]).toEqual({pageNumber: 4, type: paginationElementTypes.PAGE})
    expect(pages[4]).toEqual({pageNumber: 5, type: paginationElementTypes.PAGE})
    expect(pages[5]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[6]).toEqual({pageNumber: 7, type: paginationElementTypes.PAGE})
  })

  it('skips the previous pages if none available - page 1', () => {
    const pages = calculatePages(2, 2, 1, 7)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[1]).toEqual({pageNumber: 2, type: paginationElementTypes.PAGE})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.PAGE })
    expect(pages[3]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[4]).toEqual({pageNumber: 7, type: paginationElementTypes.PAGE})
  })

  it('does not duplicate entry for page 1 - previous is 1', () => {
    const pages = calculatePages(2, 2, 2, 7)

    expect(pages.length).toEqual(6)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({pageNumber: 2, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.PAGE })
    expect(pages[3]).toEqual({pageNumber: 4, type: paginationElementTypes.PAGE})
    expect(pages[4]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[5]).toEqual({pageNumber: 7, type: paginationElementTypes.PAGE})
  })

  it('skips next pages if none available', () => {
    const pages = calculatePages(2, 2, 7, 7)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[2]).toEqual({pageNumber: 5, type: paginationElementTypes.PAGE})
    expect(pages[3]).toEqual({pageNumber: 6, type: paginationElementTypes.PAGE})
    expect(pages[4]).toEqual({pageNumber: 7, type: paginationElementTypes.CURRENT_PAGE})
  })

  it('skips the next ellipsis if not required', () => {
    const pages = calculatePages(1, 2, 4, 7)

    expect(pages.length).toEqual(7)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.PAGE})
    expect(pages[3]).toEqual({pageNumber: 4, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[4]).toEqual({pageNumber: 5, type: paginationElementTypes.PAGE})
    expect(pages[5]).toEqual({pageNumber: 6, type: paginationElementTypes.PAGE})
    expect(pages[6]).toEqual({pageNumber: 7, type: paginationElementTypes.PAGE})
  })

  it('does not duplicate entry for the last page - next is last', () => {
    const pages = calculatePages(1, 2, 4, 5)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({type: paginationElementTypes.SEPARATOR})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.PAGE})
    expect(pages[3]).toEqual({pageNumber: 4, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[4]).toEqual({pageNumber: 5, type: paginationElementTypes.PAGE})
  })

  it('displays all pages for low overall page count', () => {
    const pages = calculatePages(1, 2, 3, 4)

    expect(pages.length).toEqual(4)
    expect(pages[0]).toEqual({pageNumber: 1, type: paginationElementTypes.PAGE})
    expect(pages[1]).toEqual({pageNumber: 2, type: paginationElementTypes.PAGE})
    expect(pages[2]).toEqual({pageNumber: 3, type: paginationElementTypes.CURRENT_PAGE})
    expect(pages[3]).toEqual({pageNumber: 4, type: paginationElementTypes.PAGE})
  })

  it('returns an empty array if there is only one page available', () => {
    const pages = calculatePages(2, 2, 1, 1)

    expect(pages.length).toBe(0)
  })

})
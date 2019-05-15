import {calculatePages} from "./paginationHelper";

describe('Pagination helper - calculatePages', () => {

  it('returns a full range of pages with both ellipses', () => {
    const pages = calculatePages(2, 3, 7, 15)

    expect(pages.length).toEqual(10)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[2]).toEqual({displayText: 5, requiresLink: true})
    expect(pages[3]).toEqual({displayText: 6, requiresLink: true})
    expect(pages[4]).toEqual({displayText: 7, requiresLink: false, isCurrent: true})
    expect(pages[5]).toEqual({displayText: 8, requiresLink: true})
    expect(pages[6]).toEqual({displayText: 9, requiresLink: true})
    expect(pages[7]).toEqual({displayText: 10, requiresLink: true})
    expect(pages[8]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[9]).toEqual({displayText: 15, requiresLink: true})
  })

  it('skips the previous ellipsis if not required', () => {
    const pages = calculatePages(2, 2, 3, 7)

    expect(pages.length).toEqual(7)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: 2, requiresLink: true})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: false, isCurrent: true })
    expect(pages[3]).toEqual({displayText: 4, requiresLink: true})
    expect(pages[4]).toEqual({displayText: 5, requiresLink: true})
    expect(pages[5]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[6]).toEqual({displayText: 7, requiresLink: true})
  })

  it('skips the previous pages if none available - page 1', () => {
    const pages = calculatePages(2, 2, 1, 7)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: false, isCurrent: true})
    expect(pages[1]).toEqual({displayText: 2, requiresLink: true})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: true })
    expect(pages[3]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[4]).toEqual({displayText: 7, requiresLink: true})
  })

  it('does not duplicate entry for page 1 - previous is 1', () => {
    const pages = calculatePages(2, 2, 2, 7)
    console.log(pages)

    expect(pages.length).toEqual(6)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: 2, requiresLink: false, isCurrent: true})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: true })
    expect(pages[3]).toEqual({displayText: 4, requiresLink: true})
    expect(pages[4]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[5]).toEqual({displayText: 7, requiresLink: true})
  })

  it('skips next pages if none available', () => {
    const pages = calculatePages(2, 2, 7, 7)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[2]).toEqual({displayText: 5, requiresLink: true})
    expect(pages[3]).toEqual({displayText: 6, requiresLink: true})
    expect(pages[4]).toEqual({displayText: 7, requiresLink: false, isCurrent: true})
  })

  it('skips the next ellipsis if not required', () => {
    const pages = calculatePages(1, 2, 4, 7)

    expect(pages.length).toEqual(7)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: true})
    expect(pages[3]).toEqual({displayText: 4, requiresLink: false, isCurrent: true})
    expect(pages[4]).toEqual({displayText: 5, requiresLink: true})
    expect(pages[5]).toEqual({displayText: 6, requiresLink: true})
    expect(pages[6]).toEqual({displayText: 7, requiresLink: true})
  })

  it('does not duplicate entry for the last page - next is last', () => {
    const pages = calculatePages(1, 2, 4, 5)

    expect(pages.length).toEqual(5)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: '...', requiresLink: false})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: true})
    expect(pages[3]).toEqual({displayText: 4, requiresLink: false, isCurrent: true})
    expect(pages[4]).toEqual({displayText: 5, requiresLink: true})
  })

  it('displays all pages for low overall page count', () => {
    const pages = calculatePages(1, 2, 3, 4)

    expect(pages.length).toEqual(4)
    expect(pages[0]).toEqual({displayText: 1, requiresLink: true})
    expect(pages[1]).toEqual({displayText: 2, requiresLink: true})
    expect(pages[2]).toEqual({displayText: 3, requiresLink: false, isCurrent: true})
    expect(pages[3]).toEqual({displayText: 4, requiresLink: true})
  })

})
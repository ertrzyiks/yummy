import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Paginator from './'

describe('<Paginator>', () => {
  afterEach(cleanup)

  it('renders links for first page', () => {
    const {getByText } = render(
      <Paginator currentPage={1} totalPages={3} currentPath={'/'} />
    );

    expect(() => { getByText('Poprzednia') }).toThrow()
    expect(getByText('Następna').closest('a').getAttribute('href')).toEqual('/page/2')
  })

  it('renders links for middle page', () => {
    const {getByText} = render(
      <Paginator currentPage={2} totalPages={3} currentPath={'/page/2'} />
    );

    expect(getByText('Poprzednia').closest('a').getAttribute('href')).toEqual('/')
    expect(getByText('Następna').closest('a').getAttribute('href')).toEqual('/page/3')
  })

  it('renders links for last page', () => {
    const {getByText} = render(
      <Paginator currentPage={3} totalPages={3} currentPath={'/page/3'} />
    );

    expect(() => {
      getByText('Następna')
    }).toThrow()
    expect(getByText('Poprzednia').closest('a').getAttribute('href')).toEqual('/page/2')
  })

  it('keeps the full path', () => {
    const {getByText} = render(
      <Paginator currentPage={2} totalPages={3} currentPath={'/some/prefix/page/2'} />
    );

    expect(getByText('Poprzednia').closest('a').getAttribute('href')).toEqual('/some/prefix')
    expect(getByText('Następna').closest('a').getAttribute('href')).toEqual('/some/prefix/page/3')
  })

  it('renders links to individual pages', () => {
    const {getByText} = render(
      <Paginator currentPage={5} totalPages={6} currentPath={'/page/5'} />
    );

    expect(getByText('1').getAttribute('href')).toEqual('/')
    expect(getByText('\u2026').getAttribute('href')).toBeNull()
    expect(getByText('3').getAttribute('href')).toEqual('/page/3')
    expect(getByText('4').getAttribute('href')).toEqual('/page/4')
    expect(getByText('5').getAttribute('href')).toBeNull()
    expect(getByText('5').getAttribute('class')).toEqual('page_nav_item current_page')
    expect(getByText('6').getAttribute('href')).toEqual('/page/6')
  })

  it('does not render a sole first page', () => {
    const { container } = render(
      <Paginator currentPage={1} totalPages={1} currentPath={'/page/1'} />
    );

    expect(container.innerHTML).toBe('')
  })
})

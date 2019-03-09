import React from 'react'
import {render, cleanup} from 'react-testing-library'
import Paginator from './'

describe('<Paginator>', () => {
  afterEach(cleanup)

  it('renders links for first page', () => {
    const {getByText} = render(
      <Paginator currentPage={1} totalPages={3} currentPath={'/'} />
    );

    expect(() => {
      getByText('Poprzednia')
    }).toThrow()
    expect(getByText('Następna').getAttribute('href')).toEqual('/page/2')
  })

  it('renders links for middle page', () => {
    const {getByText} = render(
      <Paginator currentPage={2} totalPages={3} currentPath={'/page/2'} />
    );

    expect(getByText('Poprzednia').getAttribute('href')).toEqual('/')
    expect(getByText('Następna').getAttribute('href')).toEqual('/page/3')
  })

  it('renders links for last page', () => {
    const {getByText} = render(
      <Paginator currentPage={3} totalPages={3} currentPath={'/page/3'} />
    );

    expect(() => {
      getByText('Następna')
    }).toThrow()
    expect(getByText('Poprzednia').getAttribute('href')).toEqual('/page/2')
  })

  it('keeps the full path', () => {
    const {getByText} = render(
      <Paginator currentPage={2} totalPages={3} currentPath={'/some/prefix/page/2'} />
    );

    expect(getByText('Poprzednia').getAttribute('href')).toEqual('/some/prefix')
    expect(getByText('Następna').getAttribute('href')).toEqual('/some/prefix/page/3')
  })
})
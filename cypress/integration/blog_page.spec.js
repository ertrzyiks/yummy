context('Blog', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  it('renders properly', () => {
    cy.get('a[class*=card]').should('have.length', 2)

    cy.get('a[class*=card]:first').should($card => {
      expect($card.find('span[class*=content_category]')).to.contain('blog')
      expect($card.find('h2[class*=content_title]')).to.contain('A second demo')
      expect($card.find('span[class*=date_published]')).to.contain('22 maj 2019')
      expect($card.find('div[class*=content_summary] p')).to.contain('Salami ground')
      expect($card.find('div[class*=content_summary] p').text().length).to.eq(237)
      expect($card.find('span[class*=show_more]')).to.contain('Czytaj dalej')
    })
  })

  it('renders the post page properly', () => {
    cy.get('a[class*=card]:first').click({force: true})
    cy.wait(500)

    cy.get('div[class*=post_intro]').should($post => {
      expect($post.find('ol[class*=breadcrumbs] li:first')).to.contain('Strona Główna')
      expect($post.find('ol[class*=breadcrumbs] li:last')).to.contain('blog')
      expect($post.find('h1[class*=post_title]')).to.contain('A second demo')
      expect($post.find('span[class*=date_published]')).to.contain('22 maj 2019')
      expect($post.find('div[class*=post_headline] p')).to.contain('Salami ground')
      expect($post.find('div[class*=post_headline] p').text().length).to.eq(237)
    })

    cy.get('div[class*=post_body]').should($post => {
      expect($post.find('p')).to.have.length(5)
      expect($post.find('p')).to.contain('Spicy jalapeno bacon')
      expect($post.find('p').text().length).to.eq(1835)
    })
  })
})
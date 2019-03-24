context('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders properly', () => {
    cy.get('header nav a').should('have.length', 5)

    cy.get('section').contains('Desery J').should($card => {
      expect($card.find('h2')).to.contain('Desery J')
      expect($card.find('p')).to.contain('Nagłówek')
      expect($card.find('span')).to.contain('desery')
      expect($card.find('span')).to.contain('Pokaż przepis')
      expect($card.find('span')).to.contain('60min')
    })

    cy.get('a').contains('Następna').should('be.visible')
    cy.get('span').contains('Strona 1 z 6').should('be.visible')
  })

  it('allows to search', () => {
    cy.get('input[type="text"]').type('Koktajl C', {force: true})
    cy.get('header [role="option"]').contains('Koktajl C').click({force: true})

    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/koktajle/koktajl-c')
    })
  })
})

context('Tag page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders properly', () => {
    cy.get('a').contains('Desery J').click()
    cy.get('a').contains('Woda').click()
    cy.get('section').contains('a', 'Pokaż przepis').parent().find('a').should('have.length', 9)
  })
})

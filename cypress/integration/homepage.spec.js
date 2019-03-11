context('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the navigation', () => {
    cy.get('header nav a').should('have.length', 5)
  })
})
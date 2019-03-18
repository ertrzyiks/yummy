context('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders the navigation', () => {
    cy.get('header nav a').should('have.length', 5)

    cy.get('img').should('be.visible')
  })

  it('looks good on desktop', () => {
    cy.viewport('macbook-13')
    cy.scrollTo('bottom', { duration: 2000 })
    cy.wait(500)
    cy.matchImageSnapshot('homepage-desktop')
  })
})

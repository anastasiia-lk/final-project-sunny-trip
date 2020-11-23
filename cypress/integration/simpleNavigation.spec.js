describe('Simple Website Navigation', () => {
  it('Index page button works', () => {
    // Navigate to the homepage
    cy.visit('/');

    // Test whether the title has been set correctly
    cy.title().should('eq', 'Plan Trip');

    // Click on the User List link in the Header
    cy.get(
      // CSS selector
      '[data-cy=index-button]',
    ).click();

    // Verify that the homepage content is on the page
    cy.contains('Plan your trip with 3 short steps:');

    // Test if the plan trip elements
    // is visible
    cy.get('[data-cy=plan-trip-step-1]')
      // Both of `should` and `be.visible` are defined
      // by the test framework
      .should('be.visible');
    cy.get('[data-cy=plan-trip-step-2]').should('be.visible');
    cy.get('[data-cy=plan-trip-step-3]').should('be.visible');
  });
});

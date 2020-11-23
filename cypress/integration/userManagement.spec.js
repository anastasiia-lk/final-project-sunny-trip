describe('Simple Website Navigation', () => {
  it('Allows User Get Weather Forecast', () => {
    cy.visit('/login');

    cy.get('[data-cy=username]').type('Nastya');
    cy.get('[data-cy=password]').type('Nastya');
    cy.get('[data-cy=login]').click();
    cy.contains('Nastya');
  });
});

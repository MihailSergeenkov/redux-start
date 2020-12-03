describe('Chapters App', () => {
  it('Visits mainpage', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Interesting book');
    cy.get('.chapter-name').type('test chapter').should('have.value', 'test chapter');
    cy.contains('Add chapter').click();
    cy.contains('test chapter');
  });
});

describe('empty spec', () => {
    it('can view the home page', () => {
    cy.visit('/Profile');
    cy.contains('Profile');
    });
    });
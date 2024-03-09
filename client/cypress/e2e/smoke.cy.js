describe('empty spec', () => {
    it('can view the home page', () => {
    cy.visit('/Login');
    cy.contains('Login');
    });
    });
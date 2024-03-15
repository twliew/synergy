describe('render login', () => {
    it('can view the home page', () => {
        cy.visit('/Login');
        cy.contains('Login');
    });

    it('login', () => {
        cy.visit('/Login');

        cy.get('input[name="username"]').type('Parthdsi');
        cy.get('input[name="password"]').type('Parthdesai1@');

        cy.get('form').submit();

        //cy.url().should('include', '/dashboard');

        cy.contains('Welcome,').should('be.visible');
    });
});
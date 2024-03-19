describe('render login and navigate to profile page as well as people page', () => {
    //Sprint 1
    it('can view the home page', () => {
        cy.visit('/Login');
        cy.contains('Login');
    });
    //Sprint 2
    it('login', () => {
        cy.visit('/Login');

        cy.get('input[name="username"]').type('Twliew');
        cy.get('input[name="password"]').type('Synergy1234!!');

        cy.get('form').submit();

        cy.contains('Home').should('be.visible');
    });

    it('people', () => {
            cy.get('#People').should('be.visible');
            cy.contains('People').click();
    });

    it('profile', () => {
        cy.get('#Profile').should('be.visible');
        cy.contains('Profile').click();
        cy.get('input[name="full_name"]').type('Taylor Liew');
        cy.get('input[name="username"]').type('tliew');
        cy.get('input[name="email"]').type('tliew@gmail.com');
        cy.get('input[name="password"]').type('Synergy1234!!');
        cy.get('input[name="university_name"]').type('University of Waterloo');
        cy.get('input[name="program_of_study"]').type('Management Engineering');
        cy.get('input[name="age"]').type('20');
        cy.get('input[name="bio"]').type('N/A');
        cy.get('#availability-label').should('be.visible');
        cy.get('#mood-label').should('be.visible');
    });
});
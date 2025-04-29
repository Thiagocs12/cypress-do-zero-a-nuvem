const form = {
    fillForm: user => {
        const longText = Cypress._.repeat('Thiago da Costa Santos ', 10)
        cy.get('#firstName').should('be.visible').type(user.firstName)
        cy.get('#lastName').should('be.visible').type(user.lastName)
        cy.get('#email').should('be.visible').type('thiago.santoscosgmail.com')
        cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    }
}

module.exports = form
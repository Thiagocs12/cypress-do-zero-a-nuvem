const form = require('../pageObejects/form')
const user = {
  email: 'thiago.santoscos@gmail.com',
  firstName: 'Thiago',
  lastName: 'Santos'
}

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  }),
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Thiago da Costa Santos ', 10)
    cy.get('#firstName').should('be.visible').type('Thiago')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('thiago.santoscos@gmail.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.success').should('be.visible')
  }),
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    form.fillForm(user)
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  }),
  it('impossível preencher campo telefone com caractere não numérico', () => {
    cy.get('#phone').should('be.visible').type('Thiago')

    cy.get('#phone').should('have.value', '')
  }),
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').click()
    cy.fillForm(user)
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  }),
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  }),

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.fillForm(user)
    cy.get('#firstName').should('have.value', user.firstName)
    cy.get('#lastName').should('have.value', user.lastName)
    cy.get('#email').should('have.value', user.email)
    cy.get('#open-text-area').should('have.value', 'Thiago da Costa Santos')
    
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#open-text-area').clear().should('have.value', '')
  })
})

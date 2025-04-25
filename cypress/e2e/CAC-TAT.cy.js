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
    cy.get('button[type="submit"]').should('be.visible').click()
    cy.get('.success').should('be.visible')
  }),
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Thiago da Costa Santos ', 10)
    cy.get('#firstName').should('be.visible').type('Thiago')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('thiago.santoscosgmail.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.get('button[type="submit"]').should('be.visible').click()
    cy.get('.error').should('be.visible')
  }),
  it('impossível preencher campo telefone com caractere não numérico', () => {
    cy.get('#phone').should('be.visible').type('Thiago')
    cy.get('#phone').should('have.value', '')
  }),
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Thiago da Costa Santos ', 10)
    cy.get('#firstName').should('be.visible').type('Thiago')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('thiago.santoscosgmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.get('button[type="submit"]').should('be.visible').click()
    cy.get('.error').should('be.visible')
  }),
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').should('be.visible').click()
    cy.get('.error').should('be.visible')
  })
})

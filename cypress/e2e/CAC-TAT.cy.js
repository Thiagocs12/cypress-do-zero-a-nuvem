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
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Thiago da Costa Santos ', 10)
    cy.get('#firstName').should('be.visible').type('Thiago')
    cy.get('#lastName').should('be.visible').type('Santos')
    cy.get('#email').should('be.visible').type('thiago.santoscos@gmail.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    form.fillForm(user)
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })
  it('impossível preencher campo telefone com caractere não numérico', () => {
    cy.get('#phone').should('be.visible').type('Thiago')

    cy.get('#phone').should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').click()
    cy.fillForm()
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })

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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (mentoria) por seu value', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (blog) por seu indice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"').check('elogio').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
    cy.get('input[type="checkbox"]').last()
      .should('be.checked')
    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.fillForm(user)
    cy.get('#phone-checkbox').check()
    .should('be.checked')

    cy.contains('button','Enviar').should('be.visible').click()

    cy.get('.error').should('be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.fillForm(user)
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.eql('example.json')
      })
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.fillForm(user)
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.eql('example.json')
      })
  })
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fillForm(user)
    cy.fixture('example.json').as('exemplo')
    cy.get('#file-upload').selectFile('@exemplo')
      .should(input => {
        expect(input[0].files[0].name).to.eql('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a','Política de Privacidade').should('be.visible').and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a','Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
})

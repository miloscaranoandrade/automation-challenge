/// <reference types="cypress" />

describe('Automation Challenge - Exercise 1', () => {

    beforeEach(() => {
        cy.visit('https://try.discourse.org')
        cy.clearCookies()
    })

    it('should click the Menu and display Demo page', () => {

        cy.visit('https://www.discourse.org')
        .get('#main > :nth-child(2) > :nth-child(4) > a')
            .should('have.text', 'Demo')
            .should('have.attr', 'href').and('include', 'https://try.discourse.org')
            .then((href) => {
                cy.visit(href)
                .get('#site-text-logo').should('have.text', 'Demo') 
            })
    })

    it('Should scroll to the end of the Page', () => {

        cy.scrollTo('bottom')
            .get('.topic-list-bottom').should('contain', 'There are no more latest topics.')
    })

    it('should list all locked topics descriptions', () => {

        cy.scrollTo('bottom')
            .get('.topic-list-bottom').should('contain', 'There are no more latest topics.')

        cy.get('.locked')
            .parent().parent().next()
            .each(($el, index, $list) => {         
                    cy.log(index)
                    if(index != 1){           
                    cy.get($el).first().click()
                        cy.get('#post_1 > .row > .topic-body > .regular > .cooked')
                            .then(description => {
                                const desc = Cypress.$(description).text()
                                    cy.log(desc)
                            })
                    .then(description => {
                        const desc = Cypress.$(description).text()
                        cy.log(desc)
                        cy.go('back')
                        cy.scrollTo('bottom')
                            .get('.topic-list-bottom').should('contain', 'There are no more latest topics.')
                    })
                        cy.get('.locked')
                            .parent().parent().next().last().click()
                            cy.get('#post_1 > .row > .topic-body > .regular > .cooked')
                            .then(description => {
                                const desc = Cypress.$(description).text()
                                cy.log(desc)                                
                            })
                    }
                })
    })

    it('should count the categories and print', () => {
        
        cy.get('.category-drop-header').click()

        cy.get('.select-kit-collection')
            .find('.badge-wrapper')
            .then(categories => {
                const category = Cypress.$(categories).text()
                    cy.log('**Categories Counts:** ', category)
        })
    })

    it('should print the topic title with more views', () => {

        cy.get('[data-sort-order="views"]')
            .should('have.text', 'Views')        
            .click()
        cy.get('#site-text-logo').should('exist', 'Demo')
        cy.get('.link-top-line > .title').first()
            .then(topics => {
                const topic = Cypress.$(topics).text()
                    cy.log('**Topic with more Views:** ', topic)
            })
    })
})

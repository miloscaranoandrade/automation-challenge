/// <reference types="cypress" />

describe('Automation Challenge - Exercise 2', () => {

    before(() => {
        cy.visit('https://www.trivago.com')        
    })

    it('should print informations in Hotel List section', () => {
    
        cy.get('#querytext')
            .type('Natal')
                .get('.ssg-suggestion__info > .ssg-subtitle').first()
                    .should('have.text', 'City - Rio Grande do Norte, Brazil')
                    .first()
                    .click()
                .get('[data-qa=search-button]')
                .click()
        
        cy.get('.dealform-button--guests')
            .click()
            .get(':nth-child(1) > .roomtype-btn > .roomtype-btn__wrap > .roomtype-btn__label')
            .should('have.text', 'One-person room')
            .click()
            cy.get('#mf-select-sortby').select('3')
        
        cy.get('[data-qa="itemlist-element"]', {timeout: 20000}).should('exist')
            .get('#js_itemlist').should('exist')
            .get('[data-qa="recommended-price-partner"]').first()
                .then(sites => {
                    const site = Cypress.$(sites).text()
                        cy.log('**Site Name:**', site)
                })
            .get('[data-qa="recommended-price"]').first()
                .then(prices => {
                    const price = Cypress.$(prices).text()
                        cy.log('**Room Price:**', price)
                })

        if (cy.get('[itemprop="starRating"]').first() === true){
                cy.log('**Number of Stars:**',cy.get('.star'.length))
        }else{
                cy.log("**Doesn't have stars, because it's a House or Apartment**")
        }

        cy.get('[data-qa="item-name"]').first()
            .then(names => {
                const name = Cypress.$(names).text()
                    cy.log('**Hotel Name:**', name)
            })
        
        cy.get('[data-qa="item-location-details"]').first()
            .click()
                .get('.expand-amenities ')
                    .get('.link')
                    .click()
                        .get('[data-scroll-target="amenities"]').first()
                            .get(':nth-child(2) > .unordered-list')
                                .then(amenities => {
                                    const amenity = Cypress.$(amenities).text()
                                        cy.log('**Room Facilities:**', amenity)
                                })
    })  
})
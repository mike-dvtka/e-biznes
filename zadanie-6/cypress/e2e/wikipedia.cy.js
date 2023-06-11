/// <reference types="cypress" />

describe('wikipedia', () => {
	beforeEach(() => {
		cy.visit('https://pl.wikipedia.org/');
	});

	it('Check if main page load correctly', () => {
		cy.get('#main-page-welcome').contains('Witaj w Wikipedii');
	});

	it('Is title correct', () => {
		cy.title().should('include', 'Wikipedia');
	});

	it('Look up article', () => {
		cy.get('#searchInput').type('JavaScript');
	    cy.contains('button', 'Szukaj').click();
		cy.url().should('include', 'JavaScript');
		cy.get('#firstHeading').should('contain', 'JavaScript');
	});

	it('Switch language', () => {
		cy.get('#p-lang-btn-checkbox').click();
		cy.contains('a', 'English').click();
		cy.url().should('include', 'en.wikipedia.org');
		cy.contains('Welcome to Wikipedia');
	});

	it('Footer link', () => {
		cy.get('#footer-places-about').click();
		cy.url().should('include', 'O_Wikipedii');
	});

	it('Logo visibility', () => {
	    cy.get('.mw-logo-icon').should('be.visible');
	});

	it('Check if "edit" button exists', () => {
	    cy.visit('https://pl.wikipedia.org/wiki/JavaScript');
	    cy.get('.mw-editsection > a').should('be.visible');
	});

	it('Click first link in section "See also"', () => {
	    cy.visit('https://pl.wikipedia.org/wiki/JavaScript');
	    cy.contains('Zobacz też').parent().next().find('a').first().click();
	    cy.url().should('include', '/wiki/');
	});

	it('Look for non existing article', () => {
	    cy.get('#searchInput').type('No content');
	    cy.contains('button', 'Szukaj').click();
	    cy.contains('Strony „No content” nie ma w Wikipedii.').should('be.visible');
	});

    it('Check text in the first paragraph in article', () => {
        cy.visit('https://pl.wikipedia.org/wiki/JavaScript');
        cy.get('.mw-parser-output > p').first().get('b').first().should('have.text', 'JavaScript');
    });
});

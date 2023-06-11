/// <reference types="cypress" />

describe('x-kom', () => {
	beforeEach(() => {
		cy.visit('https://www.x-kom.pl');
		cy.viewport(1400, 1400);
		cy.wait(5000);
	});

	it('Page should have correct title', () => {
	    cy.title().should('include', 'x-kom.pl');
	});

	it('Add product to cart', () => {
		cy.visit('https://www.x-kom.pl/p/650971-klawiatura-przewodowa-silver-monkey-x-smgk1000-kailh-blue-rgb-hotswap.html');
		cy.wait(2000);
		cy.get('button[title="Dodaj do koszyka"]').first().click();
	    cy.contains('Produkt dodany do koszyka');
	});

	it('Add product to wishlist', () => {
		cy.visit('https://www.x-kom.pl/p/650971-klawiatura-przewodowa-silver-monkey-x-smgk1000-kailh-blue-rgb-hotswap.html');
		cy.wait(2000);
		cy.get('button[title="Zapisz na liście"]').first().click();
	    cy.contains('Zaloguj się, żeby zapisać swoje listy i mieć do nich dostęp na wszystkich urządzeniach.');
	});

	it('Check whether the products in the category are displayed ', () => {
        cy.get('a[role="menuitem"]').contains('Laptopy i komputery').trigger('mouseover');
        cy.wait(2000);
        cy.get('a[class="sc-1h16fat-0 dNrrmO sc-a8nzxk-2 ieMrMo"]').contains('Laptopy biznesowe').click();
        cy.get('#listing-container').should('have.length.above', 0);
    });
});

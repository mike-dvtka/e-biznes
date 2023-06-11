/// <reference types="cypress" />

describe('onet', () => {
	beforeEach(() => {
		cy.visit('https://www.onet.pl');
		cy.viewport(1400, 1400);
		cy.wait(5000);
	});

	it('Search bar should exist', () => {
		cy.get('.Search_field__e_FQj').should('exist');
	});

	it('Check search bar', () => {
		cy.get('.Search_field__e_FQj').type('książka');
		cy.get('.Search_button__oKxuf').click();
		cy.get('.gsc-result-info').contains('Wyniki');
	});

	it('Check if categories redirect correctly', () => {
		cy.get('.Menu_navMenuLink__Qde0X').contains('Wiadomości').click();
		cy.url().should('be.equal', 'https://wiadomosci.onet.pl/');
	});

	it('Check if article loads', () => {
		cy.get('.BigCard_BigCardLink__TQj__').contains('Novak Djoković może przejść do historii! Zaczynamy finał Roland Garros!').click();
		cy.get('[title="Novak Djoković - Casper Ruud [RELACJA NA ŻYWO]"]').contains('Novak Djoković - Casper Ruud [RELACJA NA ŻYWO]');
		cy.url().should('be.equal', 'https://przegladsportowy.onet.pl/tenis/roland-garros/novak-djokovic-casper-ruud-na-zywo-czas-na-final-roland-garros-wynik-live/60k3l1p')
	});

	it('Check image visibility', () => {
	    cy.get('[src="https://ocdn.eu/omp3-images-transforms/1/cwck9lGaHR0cHM6Ly9vY2RuLmV1L3B1bHNjbXMvTURBXy8zOGUwMTMwZS0zZmY4LTRkNzItYjM1YS1hNThlNzdmNTkyOTQuanBlZ5SVAwDNAUjNE4jNCwaTBc0E2M0CNJUH2TIvcHVsc2Ntcy9NREFfLzI3NGMxZDY0NjcwODJjM2U2ZGZlOWQwOWY0YTZkZjZiLnBuZwDCAJUGzP_M_8z_AN4AAaEwAQ"]').should('be.visible');
	});

	it('Check register', () => {
		cy.get('[data-onboarding="header-profile-icon"]').click();
		cy.contains('Zarejestruj się').click();
		cy.url().should('include', '/register');
	});
});

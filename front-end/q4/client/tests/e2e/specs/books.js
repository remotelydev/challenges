describe("Top books", () => {
    it("Visits the books page", () => {
        cy.visit("/books");
        cy.contains("h1", "Top books of all time");
    });

    it("Checks if homepage has a link to /books", () => {
        cy.get("a").should('have.attr', 'href', '/books');
    });
});
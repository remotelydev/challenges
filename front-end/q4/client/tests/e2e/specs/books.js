describe("Top books", () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: "GET",
            url: "/books",
            response: "fixture:books.json"
        });
        cy.visit("/books");
    })
    
    it("Visits the books page", () => {
        cy.get("[data-cy=header]").should("contain", "Top books of all time");
    });

    it("Checks if books page has a link to books page", () => {
        cy.get("[data-cy=header]").should('have.attr', 'href', '/books');
    });

    it("Checks if the list is rendered", () => {
        cy.get("[data-cy=book]").should('have.length', 5);
    });

    it("Checks if pagination exists", () => {
        cy.get("[data-cy=pagination]").should("exist");
    });

    it("Checks if search filters the list", () => {
        cy.get("[data-cy=search]").find("input").type("if");
        cy.get("[data-cy=search]").find("button").click();
        cy.get("[data-cy=search]").find("span").should("contain", "Total: 4");
        cy.get("[data-cy=book]").should('have.length', 4);
    });

    it("Checks if pagination dissapeard after filtering a small list", () => {
        cy.get("[data-cy=search]").find("input").type("if");
        cy.get("[data-cy=search]").find("button").click();

        cy.get("[data-cy=pagination]").should("not.exist");
    });

    it("Checks if the Upvote button works", () => {
        cy.get("[data-cy=upvote-count]").should("contain", "Upvoted 1111 times");
        cy.get("[data-cy=upvote]").first().click().should("have.class", "reversed");
        cy.get("[data-cy=upvote-count]").should("contain", "Upvoted 1112 times");
    });
});
describe("Book details", () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: "GET",
            url: "/books/*",
            response: "fixture:book.json"
        });
        cy.visit("/books/in-search-of-lost-time");
    })
    
    it("Visits the book details page", () => {
        cy.get("[data-cy=header]").find("h1").should("contain", "In Search of Lost Time");
    });

    it("Checks if the Upvote button works", () => {
        cy.get("[data-cy=upvote-count]").should("contain", "Upvoted 1111 times");
        cy.get("[data-cy=upvote]").first().click().should("have.class", "reversed");
        cy.get("[data-cy=upvote-count]").should("contain", "Upvoted 1112 times");
    });

    it("Renders comments section", () => {
        cy.get("[data-cy=comments]").should("exist");
    });

    it("Checks if there are no comments", () => {
        cy.get("[data-cy=no-comments]").should("exist");
    });

    it("Adds a new comment", () => {
        cy.get("[data-cy=input-name]").type("Jhon Doe");
        cy.get("[data-cy=input-comment]").type("This book is awesome!");
        cy.get("[data-cy=add-comment").click();

        cy.get("[data-cy=no-comments]").should("not.exist");
        cy.get("[data-cy=comment]").should('exist');
    })
});
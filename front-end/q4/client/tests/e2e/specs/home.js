describe("Homepage", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "There's nothing here, sorry.");
  });

  it("Checks if homepage has a link to /books", () => {
    cy.visit("/");
    cy.get("a").should('have.attr', 'href', '/books');
  });
});

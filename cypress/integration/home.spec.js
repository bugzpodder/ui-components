// ASSOCIATED_TASKS: T8000
describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:6060/");
    cy.get("[data-testid=sidebar] h1").should(
      "contain",
      "Grailbio Components Style Guide",
    );
  });
});

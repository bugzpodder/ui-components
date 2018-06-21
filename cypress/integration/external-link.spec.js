describe("External Link", () => {
	it("successfully loads", () => {
		cy.visit("/#!/ExternalLink");
		cy.get("[data-preview=ExternalLink]").should("contain", "GRAIL Link in new tab");
	});
});

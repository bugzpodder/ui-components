describe("Common Typeahead", () => {
	it("successfully loads", () => {
		cy.visit("/#!/CommonTypeahead");
		cy.get("[data-preview=CommonTypeahead]").within(() => {
			cy.get("input").should("have.attr", "placeholder", "Try it out");
		});
	});
});

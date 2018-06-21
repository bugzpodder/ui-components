describe("Selector", () => {
	it("successfully loads", () => {
		cy.visit("/#!/Selector");
		cy.get("[data-preview=Selector]")
			.first()
			.within(() => {
				cy.get("[role=button]").should("contain", "Choose");
				cy.get("[role=button]").click();
			});
		cy.get("[role=listbox]").within(() => {
			cy.contains("Hello").click();
		});
		cy.get("[data-preview=Selector]")
			.first()
			.within(() => {
				cy.get("[role=button]").should("contain", "Hello");
			});
	});
});

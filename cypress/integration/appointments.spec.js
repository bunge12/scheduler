describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    cy.get('img[alt="Add"]')
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      .should("have.value", "Lydia Miller-Jones");
    cy.get('img[alt="Sylvia Palmer"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones").should(
      "be.visible"
    );
    cy.contains(".appointment__card--show", "Sylvia Palmer").should(
      "be.visible"
    );
  });

  it("should edit an interview", () => {
    cy.get('img[alt="Edit"]')
      .first()
      .click({ force: true });
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Archie Cohen")
      .should("have.value", "Archie Cohen");
    cy.get('img[alt="Tori Malcolm"]').click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Archie Cohen").should(
      "be.visible"
    );
    cy.contains(".appointment__card--show", "Tori Malcolm").should(
      "be.visible"
    );
  });

  it("should cancel an interview", () => {
    cy.get('img[alt="Delete"]')
      .first()
      .click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});

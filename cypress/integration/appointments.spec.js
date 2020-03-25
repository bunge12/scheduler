describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  xit("should book an interview", () => {
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
  });
  xit("should cancel an interview", () => {});
});

// Visits the root of our web server
// Clicks the edit button for the existing appointment
// Changes the name and interviewer
// Clicks the save button
// Sees the edit to the appointment

// Visits the root of our web server
// Clicks the delete button for the existing appointment
// Clicks the confirm button
// Sees that the appointment slot is empty

// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Header from "./Header";

describe("unit testing of header component", () => {
  it("renders footer", () => {
    mount(<Header />);
    cy.get(".app__header").should("exist");
    cy.get("[data-testid=app__header]").should("exist");
    cy.get(".app__header__contents").should("exist");
    cy.get(".app__header__contents__left").should("exist");
    cy.get(".app__header__contents__left__text").should("exist");
    cy.get(".app__header__contents__left__text").contains(
      "Image Approval Application"
    );
  });
});

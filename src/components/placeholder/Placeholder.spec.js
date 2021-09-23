// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Placeholder from "./Placeholder";

describe("unit testing of placeholder component", () => {
  it("renders placeholder", () => {
    mount(<Placeholder />);
    cy.get(".placeholder").should("exist");
    cy.get(".placeholder__image").should("exist");
  });

  it("renders the placeholder clicks/callbacks", () => {
    const onClick = cy.stub().as("onClick");
    mount(<Placeholder handleClick={() => onClick()} />);
    cy.get(".placeholder").should("exist");
    cy.get(".placeholder__image").should("exist");
    cy.get(".placeholder__image").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });
});

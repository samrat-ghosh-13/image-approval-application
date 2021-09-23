// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Button from "./Button";

describe("unit testing of button component", () => {
  it("renders button", () => {
    mount(<Button classname="unit__testing">Testing</Button>);
    cy.get(".button").should("exist");
  });
});

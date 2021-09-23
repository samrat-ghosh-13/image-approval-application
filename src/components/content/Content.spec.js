// redux
import { Provider } from "react-redux";
import { store } from "../../store/store";

// importing mount from cypress react
import { mount } from "@cypress/react";

// component
import Content from "./Content";

// rest will be captured on e2e tests
describe("unit testing of content component", () => {
  it("renders content", () => {
    mount(
      <Provider store={store}>
        <Content />
      </Provider>
    );
    cy.get(".app__content").should("exist");
    cy.get(".app__content__approved-images-text").should("exist");
    cy.get(".app__content__approved-images-text").contains("Approved Images");
    cy.get(".app__content__placeholder").should("exist");
    cy.get(".app__content__message").contains(
      "Click on the in order to get image recommendations from Unsplash"
    );
    cy.get(".app__content__message__icon").should("exist");
  });
});

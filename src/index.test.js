import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";

// components
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import ContentComponent from "./components/content/Content";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <div className="app">
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
      </div>
    </Provider>
  );

  expect(getByText(/Image Approval Application/i)).toBeInTheDocument();
});

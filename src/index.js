import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

// components
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import ContentComponent from "./components/content/Content";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

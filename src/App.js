import React from "react";

// components
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import ContentComponent from "./components/content/Content";

function App() {
  return (
    <div className="app">
      <HeaderComponent />
      <ContentComponent />
      <FooterComponent />
    </div>
  );
}

export default App;

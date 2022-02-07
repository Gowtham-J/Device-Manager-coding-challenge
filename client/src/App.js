import React from "react";
// --- moment
import "moment-timezone";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

import "./assets/App.css";
import Router from "./routes";

function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}

export default App;

import React, { createContext, useState } from "react";
// --- moment
import "moment-timezone";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

import "./assets/App.css";
import Router from "./routes";

export const AlertProvider = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  return (
    <AlertProvider.Provider
      value={{
        alertOpen: { open, setOpen },
        alertMessage: { message, setMessage },
      }}
    >
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </AlertProvider.Provider>
  );
}

export default App;

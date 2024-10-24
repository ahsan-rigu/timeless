import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import App from "./App";
import DataContextProvider from "./contexts/DataContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import SessionContextProvider from "./contexts/SessionContextProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataContextProvider>
    <AuthContextProvider>
      <UserContextProvider>
        <SessionContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SessionContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </DataContextProvider>
);

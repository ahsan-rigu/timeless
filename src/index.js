import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import DataContextProvider from "./contexts/DataContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";
import SessionContextProvider from "./contexts/SessionContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <SessionContextProvider>
            <App />
          </SessionContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </DataContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

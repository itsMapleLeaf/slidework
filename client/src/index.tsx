/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { useAuthContext } from "./auth/useAuthContext"
import Root from "./Root"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <useAuthContext.Provider>
      <Root />
    </useAuthContext.Provider>
  </BrowserRouter>,
)

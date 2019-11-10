/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import AuthResource from "./auth/AuthResource"
import Root from "./Root"

const root = ReactDOM.createRoot(document.getElementById("root")!)

const authResource = new AuthResource()

function renderApp() {
  root.render(
    <BrowserRouter>
      <Root authResource={authResource} />
    </BrowserRouter>,
  )
}

renderApp()

if (module.hot) {
  module.hot.accept("./Root", renderApp)
}

import { createGlobalStyle } from "styled-components"
import { css } from "./styled"
import { theme } from "./theme"

const style = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
  }

  :root {
    background-color: ${theme.colors.background3};
    font: 16px Rubik, sans-serif;
    color: ${theme.colors.text};
  }

  button {
    background: none;
    border: none;
    padding: none;
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`

const GlobalStyle = createGlobalStyle`${style}`

export default GlobalStyle

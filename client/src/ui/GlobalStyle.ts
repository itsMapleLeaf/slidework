import { createGlobalStyle } from "styled-components"
import { css } from "./styled"
import { theme } from "./theme"

const style = css`
  :root {
    background-color: ${theme.colors.background3};
    font: 16px Roboto, sans-serif;
    color: ${theme.colors.text};
  }

  button {
    background: none;
    border: none;
    padding: none;
    font: inherit;
    color: inherit;
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

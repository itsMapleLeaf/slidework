import { darken } from "polished"

// https://flatuicolors.com/palette/defo
const midnight = "rgb(44, 62, 80)"
const clouds = "rgb(236, 240, 241)"

export const theme = {
  colors: {
    background0: midnight,
    background1: darken(1 / 30, midnight),
    background2: darken(2 / 30, midnight),
    background3: darken(3 / 30, midnight),
    text: clouds,
  },
  shadows: {
    normal: `0px 3px 6px rgba(0, 0, 0, 0.2)`,
  },
  spacing: {
    normal: "16px",
  },
  transition: {
    normal: "0.3s",
  },
}

export type AppTheme = typeof theme

import { darken } from "polished"

// https://flatuicolors.com/palette/defo
const midnight = "rgb(44, 62, 80)"
const clouds = "rgb(236, 240, 241)"
const river = "rgb(99, 158, 247)"

export const theme = {
  colors: {
    background0: midnight,
    background1: darken(1 / 30, midnight),
    background2: darken(2 / 30, midnight),
    background3: darken(3 / 30, midnight),
    text: clouds,
    primary: river,
    semiblack: `rgba(0, 0, 0, 0.5)`,
  },
  shadows: {
    normal: `0px 3px 6px rgba(0, 0, 0, 0.2)`,
  },
  spacing: {
    large: "32px",
    normal: "16px",
    small: "12px",
    xsmall: "8px",
    xxsmall: "4px",
    xxxsmall: "2px",
    pixel: "1px",
    none: 0,
  },
  transition: {
    normal: "0.3s",
  },
}

export type AppTheme = typeof theme

/// <reference types="styled-components/cssprop" />
import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"
import { AppTheme } from "./theme"

export const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
} = styledComponents as ThemedStyledComponentsModule<AppTheme>

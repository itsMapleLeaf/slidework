import { css } from "./styled"
import { theme } from "./theme"

export const frostedPanelStyle = css`
  background-color: ${theme.colors.semiblack};
  backdrop-filter: blur(4px);

  box-shadow: ${theme.shadows.normal};
`

import { styled } from "./styled"
import { theme } from "./theme"

const Anchor = styled.a`
  transition: ${theme.transition.normal};
  :hover {
    color: ${theme.colors.primary};
  }
`

export default Anchor

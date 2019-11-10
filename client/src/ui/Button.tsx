import { transparentize } from "polished"
import { styled } from "./styled"
import { theme } from "./theme"

const Button = styled.button`
  padding: ${theme.spacing.xsmall} ${theme.spacing.small};
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.12);
  cursor: pointer;

  transition: ${theme.transition.normal};
  :hover {
    color: ${theme.colors.primary};
    background-color: ${transparentize(0.88, theme.colors.primary)};
  }
`

export default Button

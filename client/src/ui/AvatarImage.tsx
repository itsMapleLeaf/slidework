import { styled } from "./styled"

const AvatarImage = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
`

export default AvatarImage

import React from "react"

type Props = React.ComponentPropsWithoutRef<"a">

function ExternalLink(props: Props) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export default ExternalLink

import React, { Suspense } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { useRequiredAuthContext } from "../auth/authContext"
import ExternalLink from "../dom/ExternalLink"
import Anchor from "../ui/Anchor"
import Button from "../ui/Button"
import { frostedPanelStyle } from "../ui/mixins"
import { styled } from "../ui/styled"
import { theme } from "../ui/theme"
import Timeline from "./Timeline"
import useTimelineFocus from "./useTimelineFocus"

export default function TimelinePage() {
  const { containerRef, focusedId, updateFocusedId } = useTimelineFocus()
  const { user, logOut } = useRequiredAuthContext()
  return (
    <>
      <Header>
        <UserInfo title="View your profile on Twitter">
          <Avatar src={user.picture} />
          <UserName>{user.nickname}</UserName>
        </UserInfo>
        <Button css={{ flexShrink: 0 }} onClick={logOut}>
          log out
        </Button>
      </Header>

      <Main ref={containerRef}>
        <Suspense fallback={<p>loading timeline...</p>}>
          <ErrorBoundary placeholder={<p>could not load timeline :(</p>}>
            <Timeline focusedId={focusedId} onDataLoaded={updateFocusedId} />
          </ErrorBoundary>
        </Suspense>
      </Main>
    </>
  )
}

const headerHeight = "50px"

const Main = styled.main`
  margin: calc(${headerHeight} + ${theme.spacing.normal}) auto;
  max-width: 1200px;
`

const Header = styled.header`
  ${frostedPanelStyle};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 ${theme.spacing.small};
  height: ${headerHeight};
  z-index: 1;
`

const UserInfo = styled(Anchor.withComponent(ExternalLink))`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`

const UserName = styled.p`
  font-size: 20px;
  font-weight: lighter;
  margin: 0 ${theme.spacing.small};
  line-height: 1.2; /* this fixes vertical alignment */
  flex: 1;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

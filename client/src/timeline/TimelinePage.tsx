import React, { Suspense } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { useRequiredAuthContext } from "../auth/authContext"
import { styled } from "../ui/styled"
import Timeline from "./Timeline"
import useTimelineFocus from "./useTimelineFocus"

export default function TimelinePage() {
  const { containerRef, focusedId, updateFocusedId } = useTimelineFocus()
  const auth = useRequiredAuthContext()
  return (
    <>
      <nav>
        <button onClick={auth.logOut}>log out</button>
      </nav>
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

const Main = styled.main`
  margin: auto;
  max-width: 1200px;
`

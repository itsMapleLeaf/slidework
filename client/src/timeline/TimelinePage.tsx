import React, { Suspense, useCallback, useRef, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { useRequiredAuthContext } from "../auth/authContext"
import useWindowEvent from "../dom/useWindowEvent"
import { styled } from "../ui/styled"
import Timeline from "./Timeline"

export default function TimelinePage() {
  const auth = useRequiredAuthContext()
  const containerRef = useRef<HTMLElement>(null)
  const [focusedId, setFocusedId] = useState<number>()

  const updateFocusedId = useCallback(() => {
    const images =
      containerRef.current?.querySelectorAll("[data-media-id]") || []

    const focalPoint = window.innerHeight / 2 + window.scrollY

    const focusedElement = [...images].find((image) => {
      return (
        image instanceof HTMLElement &&
        focalPoint > image.offsetTop &&
        focalPoint < image.offsetTop + image.clientHeight
      )
    })

    const id =
      focusedElement instanceof HTMLElement
        ? Number(focusedElement.dataset.mediaId)
        : undefined

    setFocusedId(id)
  }, [])

  useWindowEvent("scroll", updateFocusedId, scrollEventOptions)

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

const scrollEventOptions = { passive: true }

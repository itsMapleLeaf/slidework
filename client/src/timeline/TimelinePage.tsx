import React, { Suspense, useCallback, useRef, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { useRequiredAuthContext } from "../auth/authContext"
import clamp from "../common/clamp"
import useWindowEvent from "../dom/useWindowEvent"
import { styled } from "../ui/styled"
import Timeline from "./Timeline"

export default function TimelinePage() {
  const auth = useRequiredAuthContext()
  const containerRef = useRef<HTMLElement>(null)
  const [focusedId, setFocusedId] = useState<number>()

  const getImages = () => [
    ...(containerRef.current?.querySelectorAll("[data-media-id]") || []),
  ]

  const getIdFromElement = (element: Element | undefined) =>
    element instanceof HTMLElement ? Number(element.dataset.mediaId) : undefined

  const updateFocusedId = useCallback(() => {
    const images = getImages()
    const focalPoint = window.innerHeight / 2 + window.scrollY

    const isScrolledOn = (image: Element) =>
      image instanceof HTMLElement &&
      focalPoint > image.offsetTop &&
      focalPoint <= image.offsetTop + image.clientHeight + 16 // make the areas overlap so we can't have an image not selected

    const focusedElement =
      window.scrollY < 50 ? images[0] : images.find(isScrolledOn) || images[0]

    setFocusedId(getIdFromElement(focusedElement))
  }, [])

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const delta =
        event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : undefined

      if (delta) {
        event.preventDefault()

        const images = getImages()

        const currentIndex = images.findIndex(
          (image) => getIdFromElement(image) === focusedId,
        )

        const nextImage = images[
          clamp(currentIndex + delta, 0, images.length - 1)
        ] as HTMLElement

        const scrollTarget =
          nextImage.offsetTop +
          nextImage.offsetHeight / 2 -
          window.innerHeight / 2

        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        })
      }
    },
    [focusedId],
  )

  useWindowEvent("scroll", updateFocusedId, passiveEventOptions)
  useWindowEvent("resize", updateFocusedId, passiveEventOptions)
  useWindowEvent("keydown", handleKeyboardEvent)

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

const passiveEventOptions = { passive: true }

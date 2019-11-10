import React, { Suspense, useCallback, useRef, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { useRequiredAuthContext } from "../auth/authContext"
import clamp from "../common/clamp"
import lerp from "../common/lerp"
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

    // it's possible for the first image on the page to be too short to actually overlap with the screen center,
    // so we'll do some math to make it so that the focal point is closer to the top as you scroll down,
    // so that the first image will be selected if you're closer to the top
    //
    // using a simple `if (scroll < someNumber) { useFirstImage }` is error prone if the first image is really _tall_,
    // then we won't be able to focus the second image (or the focus area will be annoyingly narrow)
    //
    // the exponent gives us some acceleration,
    // to make it so the focal point moves to the center "more quickly" as we scroll
    const windowVerticalCenter = window.innerHeight / 2 + window.scrollY
    const deltaToCenter = clamp(window.scrollY / (window.innerHeight / 2), 0, 1)
    const focalPoint = lerp(0, windowVerticalCenter, (1 - deltaToCenter) ** 3)

    const isScrolledOn = (image: Element) =>
      image instanceof HTMLElement &&
      focalPoint > image.offsetTop &&
      focalPoint <= image.offsetTop + image.clientHeight + 16 // make the areas overlap so we always have an image selected

    const focusedElement = images.find(isScrolledOn) || images[0]

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

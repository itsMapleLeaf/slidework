import React, { Suspense, useEffect, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { css, styled } from "../ui/styled"
import { theme } from "../ui/theme"
import { useTimeline } from "./useTimeline"

type Props = {
  cursor?: number
  focusedId?: number
  onDataLoaded?: () => void
}

export default function Timeline({ cursor, focusedId, onDataLoaded }: Props) {
  const data = useTimeline(cursor)
  const [renderNext, setRenderNext] = useState(false)

  useEffect(() => {
    if (data.media.length > 0) {
      onDataLoaded?.()
    }
  }, [data.media.length, onDataLoaded])

  return (
    <>
      <ImageList>
        {data.media.map((media) => (
          <ImageListItem key={media.id} data-media-id={media.id}>
            <Image
              src={media.url}
              alt=""
              role="presentation"
              shaded={focusedId !== media.id}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {renderNext ? (
        <Suspense fallback={<p>loading next page...</p>}>
          <ErrorBoundary placeholder={<p>failed to load page :(</p>}>
            <Timeline cursor={data.cursor} focusedId={focusedId} />
          </ErrorBoundary>
        </Suspense>
      ) : data.cursor ? (
        <footer>
          <button onClick={() => setRenderNext(true)}>load more</button>
        </footer>
      ) : null}
    </>
  )
}

const ImageList = styled.ul`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const ImageListItem = styled.li`
  height: calc(100vh - 200px);
  max-height: min-content;
  width: 100%;
  margin-bottom: ${theme.spacing.normal};
  filter: drop-shadow(${theme.shadows.normal});
  overflow: hidden;
`

const shadedStyle = css`
  filter: brightness(15%);
  transform: scale(1.05);
`

const Image = styled.img<{ shaded?: boolean }>`
  display: block;
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
  object-fit: contain;

  transition: ${theme.transition.normal};
  transition-property: filter, transform;
  ${(props) => props.shaded && shadedStyle}
`

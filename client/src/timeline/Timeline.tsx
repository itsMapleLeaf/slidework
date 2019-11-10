import React, { Suspense, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import { styled } from "../ui/styled"
import { theme } from "../ui/theme"
import { useTimeline } from "./useTimeline"

type Props = {
  cursor?: number
}

export default function Timeline({ cursor }: Props) {
  const data = useTimeline(cursor)
  const [renderNext, setRenderNext] = useState(false)

  return (
    <>
      <ImageList>
        {data.media.map((media) => (
          <ImageListItem key={media.id}>
            <Image src={media.url} alt="" role="presentation" />
          </ImageListItem>
        ))}
      </ImageList>

      {renderNext ? (
        <Suspense fallback={<p>loading next page...</p>}>
          <ErrorBoundary placeholder={<p>failed to load page :(</p>}>
            <Timeline cursor={data.cursor} />
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
`

const Image = styled.img`
  display: block;
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
  filter: drop-shadow(${theme.shadows.normal});
  object-fit: contain;
`

import React, { Suspense, useEffect, useState } from "react"
import ErrorBoundary from "../app/ErrorBoundary"
import ExternalLink from "../dom/ExternalLink"
import AvatarImage from "../ui/AvatarImage"
import { frostedPanelStyle } from "../ui/mixins"
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

  const focusedMedia = data.media.find((media) => media.id === focusedId)

  return (
    <>
      <ImageList>
        {data.media.map((media) => (
          <ImageListItem
            key={media.id}
            href={media.tweet.url}
            data-media-id={media.id}
          >
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
        <button onClick={() => setRenderNext(true)}>load more</button>
      ) : null}

      {focusedMedia && (
        // TODO: split this out
        <Footer>
          <TweetAvatarLink
            href={`https://twitter.com/${focusedMedia.user.username}`}
          >
            <TweetAvatar size={50} src={focusedMedia.user.avatarUrl} />
          </TweetAvatarLink>

          <TweetAuthor>
            <TweetAuthorDisplayName
              href={`https://twitter.com/${focusedMedia.user.username}`}
            >
              {focusedMedia.user.displayName}
            </TweetAuthorDisplayName>

            <TweetAuthorUsername
              href={`https://twitter.com/${focusedMedia.user.username}`}
            >
              @{focusedMedia.user.username}
            </TweetAuthorUsername>
          </TweetAuthor>

          {focusedMedia.tweet.content && (
            <TweetText href={focusedMedia.tweet.url}>
              {focusedMedia.tweet.content}
            </TweetText>
          )}
        </Footer>
      )}
    </>
  )
}

const ImageList = styled.ul`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const ImageListItem = styled(ExternalLink)`
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

const Footer = styled.footer`
  ${frostedPanelStyle};

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "avatar author"
    "avatar text";
  padding: ${theme.spacing.small};
  grid-column-gap: ${theme.spacing.small};
  grid-row-gap: ${theme.spacing.xxsmall};
`

const TweetAvatarLink = styled(ExternalLink)`
  grid-area: avatar;
`

const TweetAvatar = styled(AvatarImage).attrs({ size: 50 })``

const TweetAuthor = styled.div`
  grid-area: author;

  display: flex;
  align-items: flex-end;

  line-height: 1;
`

const TweetAuthorDisplayName = styled(ExternalLink)``

const TweetAuthorUsername = styled(ExternalLink)`
  margin-left: ${theme.spacing.xxsmall};
  font-size: 90%;
  opacity: 0.7;
`

const TweetText = styled(ExternalLink)`
  grid-area: text;
`

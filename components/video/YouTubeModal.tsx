import { useQuery } from 'react-query'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { AiOutlineClose } from 'react-icons/ai'
import '@reach/dialog/styles.css'

import btnStyles from 'components/buttons/Button.module.css'
import styles from './YouTube.module.css'
import { videoBaseUrl } from './utils'
import { YouTubeModalProps, YouTubePlaylistResponse } from './types'

export const YouTubeModal: React.FC<YouTubeModalProps> = (props) => {
  const { videoOrPlaylistId, close, isOpen } = props
  const maxWidth = window ? Math.max(window.innerWidth, 800) : 400
  const url = `${videoBaseUrl}${videoOrPlaylistId}&maxWidth=${maxWidth}`
  const { button: btn, primary, contentOnly, dialogCloseBtn } = btnStyles

  // TODO: consider separate TS for video-only response
  const { data, error, isLoading } = useQuery<YouTubePlaylistResponse, Error>(
    videoOrPlaylistId,
    () => fetch(url).then((res) => res.json())
  )

  if (isLoading) return <h2>Loading...</h2>

  if (error || data?.error) {
    return (
      <p>
        Problems with video ID <code>{videoOrPlaylistId}</code>.
      </p>
    )
  }

  const DialogCloseBtn = (
    <div className={btnStyles.dialogCloseBtnWrap}>
      <button
        className={`${btn} ${primary} ${contentOnly} ${dialogCloseBtn}`}
        onClick={close}
        type="button"
      >
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>
          <AiOutlineClose />
        </span>
      </button>
    </div>
  )

  if (!data || !data.items || !data.items.length) {
    return (
      <DialogOverlay
        isOpen={isOpen}
        onDismiss={close}
        className={styles.dialogOverlay}
      >
        <DialogContent>
          {DialogCloseBtn}
          <h2>No items found for video {videoOrPlaylistId}</h2>
        </DialogContent>
      </DialogOverlay>
    )
  }

  const { snippet } = data.items[0]
  const { title, description } = snippet

  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={close}
      className={styles.dialogOverlay}
    >
      <DialogContent>
        {DialogCloseBtn}
        <h2 className={styles.dialogTitle}>{title}</h2>
        <div className={styles.videoContainer}>
          <iframe
            src={`https://www.youtube.com/embed/${videoOrPlaylistId}`}
            title={title}
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
          />
        </div>
        {description ? (
          <p className={styles.dialogDescrip}>{description}</p>
        ) : null}
      </DialogContent>
    </DialogOverlay>
  )
}

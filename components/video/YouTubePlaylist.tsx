import { useState } from 'react'
import { useQuery } from 'react-query'
import { BiPlay } from 'react-icons/bi'

import { YouTubePlaylistResponse, YouTubePlaylistProps } from './types'
import styles from './YouTube.module.css'
import { YouTubeModal } from './YouTubeModal'
import { playlistBaseUrl } from './utils'

export const YouTubePlaylist: React.FC<YouTubePlaylistProps> = (props) => {
  const { playlistId } = props
  const { data, error, isLoading } = useQuery<YouTubePlaylistResponse, Error>(
    playlistId,
    () => fetch(`${playlistBaseUrl}${playlistId}`).then((res) => res.json())
  )
  const [modalVideoId, setModalVideoId] = useState<string>('')

  if (isLoading) return <div style={{ height: 88 }}>Loading...</div>

  if (error || data?.error) {
    return (
      <p>
        Problems with playlist ID <code>{playlistId}</code>.
      </p>
    )
  }

  if (!data?.items?.length) {
    return <h2>No data found for playlist ID {playlistId}.</h2>
  }

  return (
    <div className={styles.list}>
      {data.items.map((item) => {
        const { contentDetails, snippet } = item
        const { title, thumbnails } = snippet

        return (
          <div
            key={contentDetails.videoId}
            className={styles.thumb}
            onClick={() => {
              setModalVideoId(snippet?.resourceId?.videoId || '')
            }}
            onKeyDown={() => {
              setModalVideoId(snippet?.resourceId?.videoId || '')
            }}
            role="button"
            tabIndex={0}
            style={{
              width: thumbnails.medium?.width || 320,
              height: thumbnails.medium?.height || 180,
            }}
          >
            <img alt={title} src={thumbnails.medium?.url || ''} />
            <div className={styles.mask}>
              <BiPlay />
            </div>
          </div>
        )
      })}
      <YouTubeModal
        videoOrPlaylistId={modalVideoId}
        isOpen={modalVideoId !== ''}
        close={() => {
          setModalVideoId('')
        }}
      />
    </div>
  )
}

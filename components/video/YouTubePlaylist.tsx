import getConfig from 'next/config'
import { useQuery } from 'react-query'
import { BiPlay } from 'react-icons/bi'

import { YouTubePlaylistResponse, YouTubePlaylistProps } from './types'
import styles from './YouTube.module.css'

const { publicRuntimeConfig } = getConfig()
const { youTubeKey } = publicRuntimeConfig

const baseUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=200&key=${youTubeKey}&playlistId=`

export const YouTubePlaylist: React.FC<YouTubePlaylistProps> = (props) => {
  const { playlistId } = props
  const { data, error, isLoading } = useQuery<YouTubePlaylistResponse, Error>(
    playlistId,
    () => fetch(`${baseUrl}${playlistId}`).then((res) => res.json())
  )

  if (isLoading) return <div style={{ height: 88 }}>Loading...</div>
  if (error) return <h2>Could not get playlist ID {playlistId}.</h2>

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
            style={{
              width: thumbnails.medium.width,
              height: thumbnails.medium.height,
            }}
          >
            <img alt={title} src={thumbnails.medium.url} />
            <div className={styles.mask}>
              <BiPlay />
            </div>
          </div>
        )
      })}
    </div>
  )
}

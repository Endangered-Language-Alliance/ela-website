type YouTubeThumbnail = {
  url: string
  width: number
  height: number
}

type YouTubeThumbnails = {
  default: YouTubeThumbnail
  medium: YouTubeThumbnail
  high: YouTubeThumbnail
  standard: YouTubeThumbnail
  maxres: YouTubeThumbnail
}

type YouTubePlaylistItem = {
  snippet: {
    title: string
    description: string
    thumbnails: YouTubeThumbnails
    position: number // TODO: rm if already in order
    resourceId: {
      kind: string // e.g. youtube#video // TODO: rm if not needed
      videoId: string
    }
  }
  contentDetails: {
    videoId: string
  }
  // TODO: rm this for playlists, it's only for videos
  player: {
    embedHtml: string
  }
}

// DOCS: https://www.youtube.com/watch?v=w7Dj1iF6BJA&list=/po
export type YouTubePlaylistResponse = {
  error?: Error // appears within the data, react-query doesn't catch it
  items: YouTubePlaylistItem[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export type YouTubePlaylistProps = {
  playlistId: string
}

export type YouTubeModalProps = {
  videoOrPlaylistId: string
  isOpen: boolean
  close: () => void
}

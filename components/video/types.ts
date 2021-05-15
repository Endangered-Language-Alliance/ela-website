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
}

// DOCS: https://www.youtube.com/watch?v=w7Dj1iF6BJA&list=/po
export type YouTubePlaylistResponse = {
  items: YouTubePlaylistItem[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export type YouTubePlaylistProps = {
  playlistId: string
}

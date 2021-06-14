import getConfig from 'next/config'

export const { publicRuntimeConfig } = getConfig()
export const { youTubeKey } = publicRuntimeConfig

export const playlistBaseUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=200&key=${youTubeKey}&playlistId=`

export const videoBaseUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=${youTubeKey}&id=`

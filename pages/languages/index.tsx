import * as React from 'react'
import { GetStaticProps } from 'next'
import getConfig from 'next/config'
import ReactMapGL, { ViewportProps } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import {
  ContentType,
  LangLocation_Languagelocation,
  Language,
} from 'gql-ts/wp-graphql'
import MapMarkers from 'components/map/MapMarkers'
import { MapMarkerFields } from 'components/map/types'
import { ImageCard } from 'components/cards/ImageCard'

import mapStyles from 'components/map/Map.module.css'

type LanguagesProps = {
  data: {
    contentType: ContentType
    languages: Language[]
  }
}

export type ViewportState = Partial<ViewportProps>

const { publicRuntimeConfig } = getConfig()
const { mbToken } = publicRuntimeConfig

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const [viewport, setViewport] = React.useState<ViewportState>({
    latitude: 0,
    longitude: 0,
    zoom: 0.5,
  })

  const citiesCoords = languages?.map((node) => {
    const { langLocations } = node

    if (!langLocations?.nodes?.length)
      return {
        city: 'alpena',
        lat: 45,
        lon: -79,
      }

    // TODO: reduce to get all of them
    return langLocations.nodes[0]?.languageLocation
  }) as LangLocation_Languagelocation[]

  const more = [...languages, ...languages, ...languages, ...languages]

  return (
    <Layout title="Languages" summary={contentType?.description}>
      <div className={mapStyles.root}>
        <div className={mapStyles.mapWrap}>
          <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken={mbToken}
            width="100%"
            height="100%"
            onViewportChange={setViewport}
            maxZoom={10}
          >
            <MapMarkers markers={citiesCoords || ([] as MapMarkerFields[])} />
          </ReactMapGL>
        </div>
        <div className={mapStyles.content}>
          {more.map((node) => {
            const { uri, title, customInfo } = node
            const { background, endonym } = customInfo || {}

            return (
              <article key={uri} className={mapStyles.contentItem}>
                <ImageCard
                  title={title}
                  subtitle={endonym}
                  uri={uri}
                  summary={background}
                />
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Languages

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllLanguages()

  return {
    props: { data },
    revalidate: 10,
  }
}

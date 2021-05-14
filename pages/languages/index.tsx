import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import getConfig from 'next/config'
import ReactMapGL, { ViewportProps } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { getAllLanguages } from 'lib/api/api.languages'
import { LangLocation_Languagelocation, Language } from 'gql-ts/wp-graphql'
import MapMarkers from 'components/map/MapMarkers'
import { MapMarkerFields } from 'components/map/types'
import { ImageCard } from 'components/cards/ImageCard'

type LanguagesProps = {
  data: Language[]
}

export type ViewportState = Partial<ViewportProps>
const { publicRuntimeConfig } = getConfig()

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data = [] } = props
  const [viewport, setViewport] = React.useState<ViewportState>({
    latitude: 0,
    longitude: 0,
    zoom: 0.5,
  })

  const citiesCoords = data?.map((node) => {
    const { langLocations } = node

    if (!langLocations?.nodes?.length)
      return {
        city: 'alpena',
        lat: 45,
        lon: -79,
      }

    return langLocations.nodes[0]?.languageLocation
  }) as LangLocation_Languagelocation[]

  return (
    <>
      <Head>
        <title>Languages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero title="Languages" />
        <div
          style={{
            height: 250,
            width: '100%',
            marginBottom: 'var(--padding2)',
          }}
        >
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={publicRuntimeConfig.REACT_APP_MB_TOKEN}
            width="100%"
            height="100%"
            onViewportChange={setViewport}
          >
            <MapMarkers markers={citiesCoords || ([] as MapMarkerFields[])} />
          </ReactMapGL>
        </div>
        <section>
          {data?.map((node) => {
            const { uri, title, excerpt, featuredImage, langLocations } = node

            return (
              <article key={uri}>
                <Link href={uri || ''}>
                  <a
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr',
                      height: 200,
                      gridGap: 'var(--padding2)',
                    }}
                  >
                    <ImageCard
                      title={title}
                      sourceUrl={featuredImage?.node?.sourceUrl}
                      altText={featuredImage?.node?.altText}
                    />
                    <div>
                      {langLocations?.nodes && (
                        <ul>
                          {langLocations.nodes?.map((loc) => {
                            return (
                              <li key={loc?.name} style={{ color: 'black' }}>
                                {loc?.languageLocation?.city},{' '}
                                {loc?.languageLocation?.country}
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      <p
                        style={{ color: 'black' }}
                        dangerouslySetInnerHTML={{ __html: excerpt || '' }}
                      />
                    </div>
                  </a>
                </Link>
              </article>
            )
          })}
        </section>
      </Layout>
    </>
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

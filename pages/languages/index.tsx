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
import Image from 'next/image'
import MapMarkers from 'components/map/MapMarkers'
import { MapMarkerFields } from 'components/map/types'

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
        <Hero title="Languages">
          <p>
            Do we want to say anything down here? And/or change the title? If
            so, it's not going to be dynamic if we still want to call the nav
            menu item "Languages". Same concept as Home, where we want a
            different title.
          </p>
        </Hero>
        <div style={{ height: 250, width: '100%' }}>
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
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: 'calc(var(--padding1) * 2)',
          }}
        >
          {data?.map((node) => {
            const { uri, title, excerpt, featuredImage, langLocations } = node

            return (
              <Link key={uri} href={uri || ''}>
                <a href="">
                  <article
                    style={{
                      border: 'solid 1px var(--lightGray)',
                      borderRadius: 'var(--borderRad2)',
                      padding: 'var(--padding3)',
                      boxShadow: 'var(--elev1)',
                    }}
                  >
                    <h2>{title}</h2>
                    {featuredImage?.node?.sourceUrl && (
                      <div
                        style={{
                          position: 'relative',
                          width: 150,
                          height: 150,
                          borderRadius: 'var(--borderRad2)',
                        }}
                      >
                        <Image
                          src={featuredImage?.node.sourceUrl || ''}
                          alt={featuredImage?.node?.altText || ''}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
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
                  </article>
                </a>
              </Link>
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

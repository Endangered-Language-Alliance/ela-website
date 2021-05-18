import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Map } from 'components/map/Map'
import { getCitiesCoords } from 'components/map/utils'
import { ImageCard } from 'components/cards/ImageCard'
import { LanguagesProps } from 'components/languages/types'

import mapStyles from 'components/map/Map.module.css'

// TODO: init clusters:
// https://github.com/visgl/react-map-gl/tree/6.1-release/examples/clusters/src
const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const preppedData = getCitiesCoords(languages)
  // const more = [...languages, ...languages, ...languages, ...languages]

  return (
    <Layout title="Languages" summary={contentType?.description}>
      <div className={mapStyles.root}>
        <div className={mapStyles.mapWrap}>
          <Map preppedData={preppedData} />
        </div>
        <div className={mapStyles.content}>
          {languages.map((node) => {
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

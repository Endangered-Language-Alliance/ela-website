import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Map } from 'components/map/Map'
import { getCitiesCoords } from 'components/map/utils'
import { LanguagesProps } from 'components/languages/types'
import { LanguagesList } from 'components/languages/LanguagesList'

import mapStyles from 'components/map/Map.module.css'

// TODO: init clusters:
// https://github.com/visgl/react-map-gl/tree/6.1-release/examples/clusters/src
const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const preppedData = getCitiesCoords(languages)
  // const more = [...languages, ...languages, ...languages, ...languages]

  return (
    <Layout
      title="Languages"
      summary={contentType?.description}
      tweenerContent={
        <div className={mapStyles.fullWidthMap}>
          <Map preppedData={preppedData} />
        </div>
      }
    >
      <LanguagesList languages={languages} />
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

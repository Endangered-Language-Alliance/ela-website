import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Map } from 'components/map/Map'
import { prepCitiesMarkers, prepContinentGroups } from 'components/map/utils'
import { LanguagesProps } from 'components/languages/types'
import { ContinentGroups } from 'components/languages/LandingGroups'

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const preppedMapData = prepCitiesMarkers(languages)
  const continentGroups = prepContinentGroups(languages)

  return (
    <Layout noContentWrap title="Languages" summary={contentType?.description}>
      <Map preppedMarkerData={preppedMapData} />
      <ContinentGroups groups={continentGroups} />
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

import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllLanguages } from 'lib/api/api.languages'
import { Map } from 'components/map/Map'
import { getCitiesCoords, prepContinentGroups } from 'components/map/utils'
import { LanguagesProps } from 'components/languages/types'
import { Groups } from 'components/languages/ContinentsGroups'

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data } = props || {}
  const { contentType, languages } = data
  const preppedMapData = getCitiesCoords(languages)
  const continentGroups = prepContinentGroups(languages)

  return (
    <Layout title="Languages" summary={contentType?.description}>
      <Map preppedData={preppedMapData} />
      <Groups groups={continentGroups} />
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

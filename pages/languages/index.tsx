import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { Hero } from 'components/Hero'
import { getAllLanguages } from 'lib/api/api.languages'
import { Language } from 'gql-ts/wp-graphql'
import Image from 'next/image'

type LanguagesProps = {
  data: { node: Language }[]
}

const Languages: React.FC<LanguagesProps> = (props) => {
  const { data = [] } = props

  return (
    <div>
      <Head>
        <title>Languages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Hero title="Languages">
          <p>Pretend it's a map...</p>
        </Hero>
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridGap: 'calc(var(--padding1) * 2)',
          }}
        >
          {data?.map(({ node }) => {
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
                    {langLocations?.edges && (
                      <ul>
                        {langLocations.edges.map((loc) => {
                          return (
                            <li
                              key={loc?.node?.name}
                              style={{ color: 'black' }}
                            >
                              {loc?.node?.languageLocation?.city},{' '}
                              {loc?.node?.languageLocation?.country}
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
    </div>
  )
}

export default Languages

export const getStaticProps: GetStaticProps = async () => {
  const data = await getAllLanguages()

  return { props: { data } }
}

import fs from 'fs'
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch'
import { getIntrospectionQuery, printSchema, buildClientSchema } from 'graphql'

/**
 * runs an introspection query on an endpoint and retrieves its result
 * thanks to this gist:
 * https://gist.github.com/craigbeck/b90915d49fda19d5b2b17ead14dcd6da
 */
async function main() {
  const introspectionQuery = getIntrospectionQuery()
  const response = await fetch(
    'https://content.endangeredlanguagealliance.org/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: introspectionQuery }),
    }
  )

  const { data } = await response.json()
  const schema = buildClientSchema(data)
  const outputFile = './gql-ts/wpgraphql-schema.gql'

  fs.writeFileSync(outputFile, printSchema(schema))
}

main()

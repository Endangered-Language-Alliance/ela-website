// CRED: https://dev.to/ivanms1/next-js-graphql-typescript-setup-5bog
declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const Schema: DocumentNode

  export = Schema
}

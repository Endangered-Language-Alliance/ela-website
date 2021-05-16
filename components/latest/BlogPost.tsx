import { Layout } from 'components/Layout'
import { Post } from 'gql-ts/wp-graphql'
import { formatDate } from 'lib/utils'

export const BlogPost: React.FC<{ postData?: Post }> = (props) => {
  const { postData } = props

  if (!postData) {
    return (
      <Layout title="Not found">
        <p>No post data found.</p>
      </Layout>
    )
  }

  const { title, date, content } = postData || {}

  return (
    <Layout title={title} subtitle={formatDate(date || '')}>
      <article>
        <div dangerouslySetInnerHTML={{ __html: content || '' }} />
      </article>
    </Layout>
  )
}

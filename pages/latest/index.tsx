import { GetStaticProps } from 'next'

import { getAllPosts } from 'lib/api/api.latest'
import { Layout } from 'components/Layout'
import { PostsItem } from 'components/latest/PostsItem'
import { PostsYearsNavList } from 'components/latest/PostsYearsNavList'
import { Post } from 'gql-ts/wp-graphql'

const PostsList: React.FC<{ posts: Post[] }> = (props) => {
  const { posts = [] } = props

  if (!posts.length) return <Layout title="No posts found" />

  return (
    <Layout title="Latest">
      <PostsYearsNavList />
      {posts.map((post) => {
        const { date, title, uri, excerpt, customExcerpt } = post || {}

        return (
          <PostsItem
            key={date}
            date={date || ''}
            title={title || ''}
            uri={uri}
            summary={customExcerpt?.excerpt || excerpt || ''}
          />
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      posts: allPosts.nodes,
    },
    revalidate: 30,
  }
}

export default PostsList

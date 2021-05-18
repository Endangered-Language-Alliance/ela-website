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
    <Layout title="Latest" tweenerContent={<PostsYearsNavList />}>
      {posts.map((post) => (
        <PostsItem
          key={post.date}
          date={post.date || ''}
          title={post.title || ''}
          uri={post.uri}
          summary={post.excerpt || ''}
        />
      ))}
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

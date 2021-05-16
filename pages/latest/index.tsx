import { GetStaticProps } from 'next'

import { getAllPosts } from 'lib/api/api.latest'
import { Layout } from 'components/Layout'
import { PostsItem } from 'components/latest/PostsItem'
import { PostsYearsNavList } from 'components/latest/PostsYearsNavList'
import { Post } from 'gql-ts/wp-graphql'

const PostsList: React.FC<{ posts: Post[] }> = (props) => {
  const { posts = [] } = props

  return (
    <Layout title="Latest articles" tweenerContent={<PostsYearsNavList />}>
      {posts.map((post) => (
        <PostsItem key={post.date} {...post} />
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

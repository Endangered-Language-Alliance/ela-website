import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllPostsWithSlug, getPostsByYear } from 'lib/api/api.latest'
import { Post } from 'gql-ts/wp-graphql'
import { PostsItem } from 'components/latest/PostsItem'

type PostsListProps = { posts: Post[]; year: string }

const PostsListByYear: React.FC<PostsListProps> = (props) => {
  const { posts = [], year } = props

  if (!posts.length) return <Layout title={`No ${year} posts found`} />

  return (
    <Layout title={`${year} posts`}>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year } = params || { year: '2000' }
  const yearOfPost = parseInt(year as string, 10)
  const data = await getPostsByYear(yearOfPost)

  // Refetch current year's list of posts in background every 30 seconds.
  const currentYear = new Date().getFullYear()
  const revalidate = currentYear >= yearOfPost ? 30 : false

  return {
    props: {
      posts: data?.nodes,
      year,
    },
    revalidate,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts?.nodes?.map((node) => node?.uri || '') || [],
    fallback: true,
  }
}

export default PostsListByYear

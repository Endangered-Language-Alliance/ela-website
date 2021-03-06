import { GetStaticPaths, GetStaticProps } from 'next'

import { Layout } from 'components/Layout'
import { getAllPostsWithSlug, getPostsByYear } from 'lib/api/api.latest'
import { Post } from 'gql-ts/wp-graphql'
import { PostsItem } from 'components/latest/PostsItem'

import featCardStyles from 'components/cards/FeaturedCard.module.css'

type PostsListProps = { posts: Post[]; year: string }

const PostsListByYear: React.FC<PostsListProps> = (props) => {
  const { posts = [], year } = props

  if (!posts.length) return <Layout title={`No ${year} posts found`} />

  return (
    <Layout title={`${year} posts`} noContentWrap>
      <div className={featCardStyles.list}>
        {posts.map((post) => {
          const { date, title, uri, excerpt, customExcerpt } = post || {}

          return (
            <PostsItem
              key={date}
              date={date || ''}
              title={title || ''}
              uri={uri || ''}
              summary={customExcerpt?.excerpt || excerpt || ''}
            />
          )
        })}
      </div>
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

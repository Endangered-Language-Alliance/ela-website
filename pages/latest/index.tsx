import { GetStaticProps } from 'next'

import { getAllPosts } from 'lib/api/api.latest'
import { prepRecentYearChips } from 'lib/utils'
import { Layout } from 'components/Layout'
import { PostsItem } from 'components/latest/PostsItem'
import { Post } from 'gql-ts/wp-graphql'

import featCardStyles from 'components/cards/FeaturedCard.module.css'

const PostsList: React.FC<{ posts: Post[] }> = (props) => {
  const { posts = [] } = props

  if (!posts.length) return <Layout title="No posts found" />

  const chipsItems = prepRecentYearChips()

  return (
    <Layout title="Latest" chipsItems={chipsItems} noContentWrap>
      <div className={featCardStyles.list}>
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
      </div>
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

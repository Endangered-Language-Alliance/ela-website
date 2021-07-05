import { GetStaticPaths, GetStaticProps } from 'next'

import { getAllPostsWithSlug, getPost } from 'lib/api/api.latest'
import { BlogPost } from 'components/latest/BlogPost'
import { Post } from 'gql-ts/wp-graphql'

const PostByYear: React.FC<{ postData?: Post }> = (props) => {
  const { postData } = props

  return <BlogPost postData={postData} />
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPost(`/latest/${params?.year}/${params?.uri}` || '')
  const yearOfPost = parseInt(params?.year as string, 10)

  // Refetch current-year posts in background every 30 seconds.
  const currentYear = new Date().getFullYear()
  const revalidate = currentYear >= yearOfPost ? 30 : false

  return {
    props: {
      postData: data,
      params,
    },
    revalidate,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths:
      allPosts?.edges?.map((edge) => {
        const { node } = edge || {}

        return node?.uri || ''
      }) || [],
    fallback: true,
  }
}

export default PostByYear

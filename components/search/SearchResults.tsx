import { useSearchQuery } from 'components/search/hooks.search'
import { useRouter } from 'next/router'
import { SearchResult } from './SearchResult'

export const SearchResults: React.FC = () => {
  const router = useRouter()
  const queryString = router.query.q
  const { isLoading, isError, data } = useSearchQuery(queryString as string)

  if (!queryString) return null // prevent outbound jank
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>
  if (!data) return <div>No results found</div>

  const config = [
    { heading: 'Languages', items: data.languages },
    { heading: 'Projects', items: data.projects },
    { heading: 'Pages', items: data.pages },
  ]

  return (
    <div>
      {config.map(({ heading, items }) => (
        <div key={heading}>
          <h2>{heading}</h2>
          {items?.nodes?.map((node) => {
            if (!node) return null

            const { title, uri, customExcerpt } = node

            return (
              <SearchResult
                key={title}
                title={title || ''}
                href={uri || ''}
                content={customExcerpt?.excerpt || ''}
              />
            )
          })}
        </div>
      ))}
      <div>
        <h2>Posts</h2>
        {data.posts?.nodes?.map((node) => {
          if (!node) return null
          const { title, uri, excerpt } = node

          return (
            <SearchResult
              key={title}
              title={title || ''}
              href={uri || ''}
              isHtml
              content={excerpt || ''}
            />
          )
        })}
      </div>
    </div>
  )
}

import { useSearchQuery } from 'components/search/hooks.search'
import { useRouter } from 'next/router'
import { SearchResult } from './SearchResult'

// CRED: for the tags part:
// https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
function removeWpLinks(text: string): string {
  return text.replace(/(<([^>]+)>)/gi, '').replace(/ Continue reading.*/gi, '')
}

export const SearchResults: React.FC = () => {
  const router = useRouter()
  const queryString = router.query.q
  const { isLoading, isError, data } = useSearchQuery(queryString as string)

  if (!queryString) return null // prevent outbound jank
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong</div>

  // 🤮
  const noResults =
    !data?.languages.nodes?.length &&
    !data?.projects.nodes?.length &&
    !data?.pages.nodes?.length &&
    !data?.posts.nodes?.length

  if (!data || noResults) return <div>No results found</div>

  const config = [
    { heading: 'Languages', items: data.languages },
    { heading: 'Projects', items: data.projects },
    { heading: 'Pages', items: data.pages },
  ]

  // TODO: DRY out
  return (
    <div>
      {config
        .filter(({ items }) => items?.nodes?.length)
        .map(({ heading, items }) => (
          <div key={heading} style={{ marginBottom: 'var(--p5)' }}>
            <h2>{heading}</h2>
            {items?.nodes?.map((node) => {
              if (!node) return null

              const { title, uri, customExcerpt } = node

              return (
                <SearchResult
                  key={title}
                  title={title || ''}
                  href={uri || ''}
                  content={removeWpLinks(customExcerpt?.excerpt || '')}
                />
              )
            })}
          </div>
        ))}
      {!!data.posts?.nodes?.length && (
        <div style={{ marginBottom: 'var(--p5)' }}>
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
                content={removeWpLinks(excerpt || '')}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

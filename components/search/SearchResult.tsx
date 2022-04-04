import Link from 'next/link'

type Props = {
  title: string
  href: string
  content: string
  isHtml?: boolean
}

export const SearchResult: React.FC<Props> = (props) => {
  const { title, href, content, isHtml } = props

  return (
    <article>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
        <Link href={href}>{title}</Link>
      </h3>
      {(!isHtml && <p>{content}</p>) || (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </article>
  )
}

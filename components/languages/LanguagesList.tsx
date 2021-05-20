import Link from 'next/link'

import cardStyles from 'components/cards/Card.module.css'
import styles from './Languages.module.css'
import { LanguagesListProps } from './types'

export const LanguagesList: React.FC<LanguagesListProps> = (props) => {
  const { languages } = props
  // const tons = [...languages, ...languages, ...languages]

  return (
    <div className={styles.langsList}>
      {languages.map((node) => {
        const { uri, customExcerpt, title, customInfo } = node
        const { endonym } = customInfo || {}

        return (
          <article key={uri} className={cardStyles.root}>
            <Link href={uri || ''}>
              <a className={cardStyles.link}>
                <header className={cardStyles.header}>
                  <h2 className={cardStyles.title}>{title}</h2>
                  {endonym && (
                    <div role="doc-subtitle" className={cardStyles.subtitle}>
                      {endonym}
                    </div>
                  )}
                </header>
                <div className={cardStyles.inner}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: customExcerpt?.excerpt?.trim() || '',
                    }}
                  />
                </div>
              </a>
            </Link>
          </article>
        )
      })}
    </div>
  )
}

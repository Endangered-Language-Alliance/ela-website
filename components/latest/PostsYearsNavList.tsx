import Link from 'next/link'

import { intRange } from 'lib/utils'

import chipStyles from 'components/buttons/Chip.module.css'

export const PostsYearsNavList: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const spanOfYears = currentYear - 2010 // oldest post year

  return (
    <nav className={chipStyles.listWrapper}>
      <ul className={chipStyles.list}>
        {intRange(currentYear, currentYear - spanOfYears, -1).map(
          (postYear) => (
            <li
              key={postYear}
              className={`${chipStyles.chip} ${chipStyles.primary}`}
            >
              <Link href={`/latest/${postYear}`}>
                <a>{postYear}</a>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

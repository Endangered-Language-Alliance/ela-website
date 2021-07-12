import Link from 'next/link'
import { GiSoundWaves } from 'react-icons/gi'
import { BiBullseye } from 'react-icons/bi'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

import styles from 'components/Showcase.module.css'

export type ShowcaseProps = {
  projectsCount: number
  langsCount: number
  projectsBody: string
  langsBody: string
}

export type ShowcaseItemProps = {
  icon: React.ReactNode
  title: string
  body: string
  href: string
}

export const ShowcaseItem: React.FC<ShowcaseItemProps> = (props) => {
  const { icon, title, body, href } = props

  return (
    <Link href={href}>
      <a className={styles.item}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.inner}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
        </div>
      </a>
    </Link>
  )
}

export const Showcase: React.FC<ShowcaseProps> = (props) => {
  const { projectsCount, langsCount, projectsBody, langsBody } = props

  return (
    <div className={styles.list}>
      <ShowcaseItem
        icon={<AiOutlineFundProjectionScreen />}
        title={`${projectsCount} Projects`}
        body={projectsBody}
        href="/projects"
      />
      <div className={styles.spacer} />
      <ShowcaseItem
        icon={<GiSoundWaves />}
        title={`${langsCount} Languages`}
        body={langsBody}
        href="/languages"
      />
      <div className={styles.spacer} />
      <ShowcaseItem
        icon={<BiBullseye />}
        title="1 Mission"
        body="ELA's network is an extended family of linguists, language activists, community leaders, students, volunteers, and lovers of language in NYC and the world over."
        href="/about"
      />
    </div>
  )
}

import Link from 'next/link'
import { GiSoundWaves } from 'react-icons/gi'
import { BiBullseye } from 'react-icons/bi'
import { AiOutlineFundProjectionScreen } from 'react-icons/ai'

import styles from 'components/Showcase.module.css'

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

export const Showcase: React.FC = () => {
  return (
    <div className={styles.list}>
      <ShowcaseItem
        icon={<AiOutlineFundProjectionScreen />}
        title="10 Projects"
        body="With ten current larger-scale projects and additional work on individual languages, ELA focuses on languages spoken by communities and individuals in the New York City area."
        href="/projects"
      />
      <div className={styles.spacer} />
      <ShowcaseItem
        icon={<GiSoundWaves />}
        title="43 Languages"
        body="ELA has worked to different degrees on numerous projects with speakers of over a hundred languages spoken in New York City and beyond. More in-depth work continues on the several dozen featured here."
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

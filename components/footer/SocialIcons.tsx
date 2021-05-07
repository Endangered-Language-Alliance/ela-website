import { CgFacebook, CgInstagram, CgYoutube } from 'react-icons/cg'
import { GiGreekTemple } from 'react-icons/gi'

import styles from './Footer.module.css'

import { SocialIconsProps } from './types'

export const SocialIcons: React.FC<SocialIconsProps> = (props) => {
  const { archiveOrg, facebook, instagram, youTube } = props

  return (
    <ul className={styles.social}>
      <li>
        <a href={youTube || ''} target="blank" title="ELA YouTube profile">
          <CgYoutube />
        </a>
      </li>
      <li>
        <a href={facebook || ''} target="blank" title="ELA Facebook profile">
          <CgFacebook />
        </a>
      </li>
      <li>
        <a
          href={archiveOrg || ''}
          target="blank"
          title="ELA Archive.org profile"
        >
          <GiGreekTemple />
        </a>
      </li>
      <li>
        <a href={instagram || ''} target="blank" title="ELA Instagram profile">
          <CgInstagram />
        </a>
      </li>
    </ul>
  )
}

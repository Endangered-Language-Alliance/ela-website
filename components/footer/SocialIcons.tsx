import { CgInstagram, CgYoutube, CgFacebook } from 'react-icons/cg'
import { GiGreekTemple } from 'react-icons/gi'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { BiPhone } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'

import styles from './Footer.module.css'

import { SocialIconsProps } from './types'

export const SocialIcons: React.FC<SocialIconsProps> = (props) => {
  const { archiveOrg, facebook, instagram, youTube } = props
  const { phone, email, address } = props

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
      <li>
        <a
          href={`https://www.google.com/maps/place/${address}/data=!4m2!3m1!1s0x89c259a2fc210f43:0xa4e28c3ee94c0ddc?sa=X&ved=2ahUKEwj5k8Dry8XwAhXUrJ4KHY9QDGMQ8gEwAHoECAQQAQ`}
          target="blank"
          title="ELA address in Google Maps"
        >
          <FaMapMarkedAlt />
        </a>
      </li>
      <li>
        <a href={`tel:+${phone}`}>
          <BiPhone />
        </a>
      </li>
      <li>
        <a href={`mailto:${email}`}>
          <HiOutlineMail />
        </a>
      </li>
    </ul>
  )
}

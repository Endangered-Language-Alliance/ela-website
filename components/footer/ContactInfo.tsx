import footerStyles from './Footer.module.css'
import { ContactInfoProps } from './types'

export const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  const { address, email, phone } = props

  return (
    <address className={footerStyles.contact}>
      <a href="tel:+">{phone}</a>
      <br />
      <a href="mailto:">{email}</a>
      <br />
      {address}
    </address>
  )
}

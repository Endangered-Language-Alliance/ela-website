import footerStyles from './Footer.module.css'
import { ContactInfoProps } from './types'

export const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  const { address, email, phone } = props

  return (
    <address className={footerStyles.contact}>
      <a href={`tel:+${phone}`}>{phone}</a>
      <br />
      <a href={`mailto:${email}`}>{email}</a>
      <br />
      <a
        href={`https://www.google.com/maps/place/${address}/data=!4m2!3m1!1s0x89c259a2fc210f43:0xa4e28c3ee94c0ddc?sa=X&ved=2ahUKEwj5k8Dry8XwAhXUrJ4KHY9QDGMQ8gEwAHoECAQQAQ`}
        target="blank"
        title="ELA address in Google Maps"
      >
        {address}
      </a>
    </address>
  )
}

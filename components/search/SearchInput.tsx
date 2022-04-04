import { IoSearch } from 'react-icons/io5'
import styles from './Search.module.css'

type Props = {
  desktopOnly?: boolean
}

export const SearchInput: React.FC<Props> = (props) => {
  const { desktopOnly } = props
  const extraClass = desktopOnly ? ` ${styles.desktopOnly}` : ''

  return (
    <form
      role="search"
      className={styles.searchBox + extraClass}
      action="/search?q=null"
    >
      <div className={styles.searchBtnIcon}>
        <IoSearch />
      </div>
      <input
        className={styles.searchInput}
        name="q"
        id="search"
        type="search"
        placeholder="Search"
      />
    </form>
  )
}

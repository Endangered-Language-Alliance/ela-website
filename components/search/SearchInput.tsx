import { IoSearch } from 'react-icons/io5'
import styles from './Search.module.css'

export const SearchInput: React.FC = () => {
  return (
    <form role="search" className={styles.searchBox} action="/search?q=null">
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

import btnStyles from 'components/buttons/Button.module.css'
import { useRouter } from 'next/router'
import { BaseSyntheticEvent } from 'react'
import { IoSearch } from 'react-icons/io5'
import styles from './Search.module.css'

type Props = {
  desktopOnly?: boolean
  setIsOpen?: React.Dispatch<boolean>
}

const INPUT_ELEM_NAME = 'q'

// CRED: (some) https://pagedart.com/blog/how-to-add-a-search-bar-in-html/
export const SearchInput: React.FC<Props> = (props) => {
  const { desktopOnly, setIsOpen } = props
  const extraClass = desktopOnly ? ` ${styles.desktopOnly}` : ''
  const router = useRouter()

  return (
    <form
      role="search"
      className={styles.searchBox + extraClass}
      onSubmit={(e: BaseSyntheticEvent) => {
        e.preventDefault()

        const form = new FormData(e.target)
        const query = form.get(INPUT_ELEM_NAME)

        if (query !== null) {
          setIsOpen?.(false)
          router.push(`/search?q=${query}`)
        }
      }}
    >
      <input
        className={styles.searchInput}
        name={INPUT_ELEM_NAME}
        id="search"
        type="search"
        placeholder="Search"
      />
      <button
        type="submit"
        // NOTE: on build, Next always seems to put the button class second, no
        // matter what, so have to heavy-hand with style tag.
        style={{
          minWidth: 'unset',
          boxShadow: 'none',
          paddingLeft: 12,
          paddingRight: 0,
        }}
        className={`${styles.searchBtn} ${btnStyles.button}`}
      >
        <IoSearch />
      </button>
    </form>
  )
}

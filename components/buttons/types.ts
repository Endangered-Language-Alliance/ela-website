export type ChipColor = {
  color?: 'primary' | 'secondary'
}

export type ChipProps = {
  text: string
  uri: string
  external?: boolean // for `target="_blank"
} & ChipColor

export type ChipsListProps = {
  items: ChipProps[]
} & ChipColor

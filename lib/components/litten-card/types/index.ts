import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

export type LittenCardComponentProps = {
  distance: number
  editable?: boolean
  isFavourite?: boolean
  litten: BasicLitten & {
    distance?: number
  }
  onPressAction?: (litten: BasicLitten) => void
  user: BasicUser
}
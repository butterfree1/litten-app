import { Pressable } from 'react-native'
import { useTheme } from '@hooks'
import UIImage from '@ui-elements/image'
import {
  UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
  UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
  UI_PRESSED_OPACITY,
} from '@utils/constants'

const UIImagePlaceholderImageItem = ({ source, onPress, onLongPress }) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    uiImagePlaceholderCommon: {
      height: UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
      aspectRatio: 1,
      marginTop: UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
      marginBottom: UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.neutralLighter,
    },
    uiImagePlaceholderPressed: {
      opacity: UI_PRESSED_OPACITY,
    },
  }))
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) =>
        pressed ? styles.uiImagePlaceholderPressed : undefined
      }
    >
      <UIImage source={source} style={styles.uiImagePlaceholderCommon} />
    </Pressable>
  )
}

export default UIImagePlaceholderImageItem
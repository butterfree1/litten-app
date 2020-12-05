/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, Text } from 'react-native'
import { UI_HIDDEN_OPTION_WIDTH, UI_PRESSED_OPACITY } from 'utils/constants'
import colors from 'styles/colors'

const UIMessageHiddenItem: (args: any) => React$Node = ({
  children,
  style,
  ...otherProps
}) => (
  <Pressable
    style={({ pressed }) => [
      styles.uiMessageHiddenItem,
      style,
      pressed ? styles.uiMessageHiddenItemPressed : undefined,
    ]}
    {...otherProps}>
    {typeof children === 'string' ? (
      <Text style={styles.uiMessageHiddenItemText}>{children}</Text>
    ) : (
      children
    )}
  </Pressable>
)

const styles = StyleSheet.create({
  uiMessageHiddenItem: {
    minWidth: UI_HIDDEN_OPTION_WIDTH,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    opacity: 1,
  },
  uiMessageHiddenItemText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  uiMessageHiddenItemPressed: {
    opacity: UI_PRESSED_OPACITY,
  },
})

export default UIMessageHiddenItem

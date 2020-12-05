/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'

const UIContainer: (args: any) => React$Node = ({
  children,
  style,
  ...otherProps
}) => (
  <View {...otherProps} style={StyleSheet.compose(styles.uiContainer, style)}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  uiContainer: {
    width: '75%',
  },
})

export default UIContainer

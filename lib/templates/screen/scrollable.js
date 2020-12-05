/**
 * @format
 * @flow
 */

import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenTabularNav from 'templates/screen/tabular-nav'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
} from 'utils/constants'
import { screenTemplateStyles } from 'styles/common'
import colors from 'styles/colors'

const ScrollableScreenTemplate: (args: any) => React$Node = ({
  children,
  header,
  tabs,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.containerStyle}>
      <View style={screenTemplateStyles.contentView}>
        <View style={screenTemplateStyles.header}>{header}</View>
        <View style={screenTemplateStyles.topBar} />
        {tabs && (
          <ScreenTabularNav tabs={tabs} style={screenTemplateStyles.tabBar} />
        )}
        <View
          style={[
            screenTemplateStyles.contentCommon,
            styles.contentIn,
            {
              paddingBottom:
                STRUCTURE_TAB_NAV_HEIGHT +
                Math.max(insets.bottom, STRUCTURE_TAB_NAV_HEIGHT * 0.5),
            },
          ]}>
          {children}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.lightGray,
  },
  contentContainerStyle: {
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  },
  contentIn: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default ScrollableScreenTemplate

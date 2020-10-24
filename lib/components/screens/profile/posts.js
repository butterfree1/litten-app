/**
 * @format
 * @flow
 */

import { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import Litten from 'model/litten'
import Search from 'model/search'
import LittenCard from 'components/litten-card'
import { UIActionSheet, UILoader, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfilePosts: (args: any) => React$Node = ({
  active,
  authenticatedUser,
  setActivePosts,
  setPastPosts,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    saved: { activePosts, pastPosts },
  } = authenticatedUser
  const posts = active ? activePosts : pastPosts
  const hasItems = !posts.length

  const search = useRef(new Search())

  const updatePosts = async () => {
    const userActivePosts = await search.current.userActivePosts()
    setActivePosts(userActivePosts)
    const userInactivePosts = await search.current.userInactivePosts()
    setPastPosts(userInactivePosts)
  }

  const toggleActive = async (item) => {
    setIsLoading(true)
    const litten = new Litten(item)
    if (active) {
      await litten.archive()
    } else {
      await litten.activate()
    }
    await updatePosts()
    setIsLoading(false)
  }

  const deleteLitten = async (item) => {
    setIsLoading(true)
    const litten = new Litten(item)
    await litten.delete()
    await updatePosts()
    setIsLoading(false)
  }

  const confirmDelete = (item) => {
    const { title } = item
    Alert.alert(
      translate('cta.deleteLitten'),
      translate('feedback.confirmMessages.deleteLitten', { title }),
      [
        {
          text: translate('cta.yes'),
          onPress: () => deleteLitten(item),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => toggleActive(item),
        },
        { cancelable: false },
      ],
    )
  }

  const handleOnPressAction = (item) => {
    const markAs = active
      ? translate('screens.profile.postsMarkInactive')
      : translate('screens.profile.postsMarkActive')
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          markAs,
          translate('screens.profile.postsDelete'),
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          toggleActive(item)
        } else if (buttonIndex === 2) {
          confirmDelete(item)
        }
      },
    )
  }

  return (
    <View style={styles.resultsContainer}>
      <UILoader active={isLoading} transparent />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <LittenCard
            litten={item}
            authenticatedUser={authenticatedUser}
            handleOnPressAction={() => handleOnPressAction(item)}
            editable
          />
        )}
        ListEmptyComponent={<UIText>{'Nothing to see here...'}</UIText>}
        contentContainerStyle={styles.contentContainer}
        bounces={hasItems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)
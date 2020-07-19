/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabNavigation from 'structure/tab-navigation'
import HomeScreen from 'screens/home'
import FavScreen from 'screens/fav'
import NewScreen from 'screens/new'
import MessagesScreen from 'screens/messages'
import ProfileScreen from 'screens/profile'
import { menuFav, menuHome, menuMessages, menuNew, menuProfile } from 'images'
import {
  SCREEN_TAB_NAV_FAV,
  SCREEN_TAB_NAV_HOME,
  SCREEN_TAB_NAV_MESSAGES,
  SCREEN_TAB_NAV_NEW,
  SCREEN_TAB_NAV_PROFILE,
} from 'utils/constants'

const screenItems = [
  {
    key: 'home',
    name: SCREEN_TAB_NAV_HOME,
    component: HomeScreen,
    tabBarIcon: menuHome,
    tabBarAccessibilityLabel: 'Home',
  },
  {
    key: 'fav',
    name: SCREEN_TAB_NAV_FAV,
    component: FavScreen,
    tabBarIcon: menuFav,
    tabBarAccessibilityLabel: 'Fav',
  },
  {
    key: 'new',
    name: SCREEN_TAB_NAV_NEW,
    component: NewScreen,
    tabBarIcon: menuNew,
    tabBarAccessibilityLabel: 'New',
  },
  {
    key: 'messages',
    name: SCREEN_TAB_NAV_MESSAGES,
    component: MessagesScreen,
    tabBarIcon: menuMessages,
    tabBarAccessibilityLabel: 'Messages',
  },
  {
    key: 'profile',
    name: SCREEN_TAB_NAV_PROFILE,
    component: ProfileScreen,
    tabBarIcon: menuProfile,
    tabBarAccessibilityLabel: 'Profile',
  },
]

const Tab = createBottomTabNavigator()

const Main: () => React$Node = () => (
  <Tab.Navigator tabBar={(props) => <TabNavigation {...props} />}>
    {screenItems.map(
      ({ key, name, component, tabBarIcon, tabBarAccessibilityLabel }) => (
        <Tab.Screen
          key={key}
          name={name}
          component={component}
          options={{ tabBarIcon, tabBarAccessibilityLabel }}
        />
      ),
    )}
  </Tab.Navigator>
)

export default Main
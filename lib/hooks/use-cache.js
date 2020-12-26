/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLitten, addUser } from 'store/actions/cache'
import { cacheSelector } from 'store/selectors'

const useCache = (type: string = ''): [any, (obj: any) => void] => {
  const dispatch = useDispatch()

  const cache = useSelector(cacheSelector)

  const { littens = {}, users = {} } = cache || {}

  const addCacheLitten = useCallback(
    (newLitten) => dispatch(addLitten(newLitten)),
    [dispatch],
  )

  const addCacheUser = useCallback((newUser) => dispatch(addUser(newUser)), [
    dispatch,
  ])

  if (type === 'littens') {
    return [littens, addCacheLitten]
  }

  if (type === 'users') {
    return [users, addCacheUser]
  }

  return [cache, () => undefined]
}

export default useCache
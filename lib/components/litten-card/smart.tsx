import Toast from 'react-native-simple-toast'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useCacheUsers, useFavourite, useUserCoordinates } from '@hooks'
import LittenCardComponent from '@components/litten-card/card-component'
import Litten from '@model/litten'
import { distanceBetween } from '@utils/functions'
import { translate } from '@utils/i18n'
import { debugLog } from '@utils/dev'
import type { LittenCardComponentProps } from '@components/litten-card/types'
import type { BasicUser } from '@model/types/user'

export type LittenSmartCardProps = Pick<
  LittenCardComponentProps,
  'litten' | 'editable' | 'onPressAction'
>

const LittenSmartCard = ({
  litten: littenProp,
  editable,
  onPressAction,
}: LittenSmartCardProps) => {
  const [getUser] = useCacheUsers()
  const [user, setUser] = useState<BasicUser>()
  const [isLoading, setIsLoading] = useState(true)
  const [distance, setDistance] = useState(0)
  const litten = useRef(
    littenProp instanceof Litten ? littenProp : new Litten(littenProp),
  ).current
  const [isFavourite] = useFavourite(litten)
  const [authenticatedUserCoordinates] = useUserCoordinates()
  const distanceKM = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      littenProp.distance ??
      distanceBetween(litten.coordinates, authenticatedUserCoordinates),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [authenticatedUserCoordinates, litten.coordinates, littenProp.distance],
  )

  debugLog('LittenSmartCard', litten.id, 'isLoading', isLoading)

  const setUp = useCallback(
    async (item) => {
      const userInfo = await getUser(item.userUid)
      setUser(userInfo)
      setDistance(distanceKM)
      setIsLoading(false)
    },
    [distanceKM, getUser],
  )

  useEffect(() => {
    setUp(litten)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return null
  }

  if (!user?.id) {
    return null
  }

  return (
    <LittenCardComponent
      distance={distance}
      editable={editable}
      isFavourite={isFavourite}
      litten={litten}
      onPressAction={onPressAction}
      user={user}
    />
  )
}

LittenSmartCard.defaultProps = {
  editable: false,
  onPressAction: () =>
    Toast.show(translate('feedback.errorMessages.notImplemented')),
}

export default LittenSmartCard

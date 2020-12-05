/**
 * @format
 * @flow
 */

import { useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Alert, StyleSheet, View } from 'react-native'
import { FORM_NEW_SET_LOCATION } from 'store/actions/form-new'
import {
  UIButton,
  UIImagePlaceholder,
  UIInput,
  UIListItem,
  UISwitch,
  UIText,
  UITextArea,
} from 'ui-elements'
import Litten from 'model/litten'
import Search from 'model/search'
import AddPhoto from 'components/add-photo'
import {
  littenLocationValidator,
  littenPhotoValidator,
  littenSpeciesValidator,
  littenStoryValidator,
  littenTitleValidator,
  littenTypeValidator,
} from 'utils/validators'
import {
  getFromListByKey,
  getImagePath,
  iterateTimes,
  stringifyLocation,
} from 'utils/functions'
import { logError } from 'utils/dev'
import { translate } from 'utils/i18n'
import {
  NEW_POST_NUM_OF_PHOTOS,
  SCREEN_LITTEN_POST,
  SCREEN_NEW_LOCATION,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'

const NewForm: (args: any) => React$Node = ({
  addPhoto,
  clearNewForm,
  formNew: litten,
  removePhoto,
  setActivePosts,
  setLocation,
  setSpecies,
  setStory,
  setTitle,
  setType,
  setUseExtraInfo,
  updatePhoto,
  user,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { photos, story, title, species, type, location, useExtraInfo } = litten

  const navigation = useNavigation()
  const { showActionSheetWithOptions } = useActionSheet()

  const search = useRef(new Search({ user })).current

  const handleOnPhotoChange = (image, index = null) => {
    if (image) {
      const imagePath = getImagePath(image)
      if (index === null) {
        addPhoto({ uri: imagePath })
      } else {
        updatePhoto({ uri: imagePath }, index)
      }
    } else {
      removePhoto(index)
    }
  }

  const chooseSpecies = () => {
    const options = [
      ...littenSpeciesList.map(({ label }) => label),
      translate('cta.cancel'),
    ]

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (Number.isInteger(buttonIndex)) {
          setSpecies(littenSpeciesList[buttonIndex]?.key)
        }
      },
    )
  }

  const chooseType = () => {
    const options = [
      ...littenTypes.map(({ label }) => label),
      translate('cta.cancel'),
    ]

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (Number.isInteger(buttonIndex)) {
          setType(littenTypes[buttonIndex]?.key)
        }
      },
    )
  }

  const clearForm = (confirm = false) => {
    Alert.alert(
      translate('cta.clearForm'),
      translate('feedback.confirmMessages.clearForm'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => clearNewForm(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }

  const validateForm = () => {
    const validators = [
      littenPhotoValidator(photos),
      littenTitleValidator(title),
      littenSpeciesValidator(species),
      littenTypeValidator(type),
      littenStoryValidator(story),
      littenLocationValidator(location),
    ]
    for (const validator of validators) {
      const { error, errorMessage } = validator
      if (error) {
        Alert.alert(errorMessage)
        return false
      }
    }
    return true
  }

  const updatePosts = async () => {
    const userActivePosts = await search.userActivePosts()
    setActivePosts(userActivePosts)
  }

  const submitForm = async () => {
    const isFormValid = validateForm()
    if (isFormValid) {
      const newLitten = new Litten({ ...litten, user })

      try {
        setIsSubmitting(true)
        await newLitten.save()
        clearNewForm()
        updatePosts()
        setIsSubmitting(false)
        Alert.alert(translate('screens.new.createSuccess'))
      } catch (err) {
        logError(err)
        setIsSubmitting(false)
      }
    }
  }

  const littenSpecies = getFromListByKey(littenSpeciesList, species)?.label
  const littenType = getFromListByKey(littenTypes, type)?.label

  return (
    <>
      <UIText>{translate('screens.new.addPhotos')}</UIText>
      <UIImagePlaceholder.Group>
        {iterateTimes(NEW_POST_NUM_OF_PHOTOS).map((v, idx) => (
          <AddPhoto
            key={idx}
            imageSource={photos[idx]}
            actionable={idx === photos.length}
            ImageComponent={UIImagePlaceholder.ImageItem}
            PlaceholderComponent={UIImagePlaceholder.Item}
            onChange={(image) => handleOnPhotoChange(image, idx)}
          />
        ))}
      </UIImagePlaceholder.Group>
      <View style={styles.formContainer}>
        <UIInput
          placeholder={translate('screens.new.addTitle')}
          onChangeText={setTitle}
          value={title}
        />
        <UIListItem onPress={chooseSpecies} hasExtra>
          {littenSpecies || translate('screens.new.addSpecies')}
        </UIListItem>
        <UIListItem onPress={chooseType} hasExtra>
          {littenType || translate('screens.new.addType')}
        </UIListItem>
        <UITextArea
          placeholder={translate('screens.new.addStory')}
          onChangeText={setStory}>
          {story}
        </UITextArea>
        <UIListItem
          onPress={() =>
            navigation.navigate(SCREEN_NEW_LOCATION, {
              initialCoordinates: location?.coordinates,
              dispatchToAction: FORM_NEW_SET_LOCATION,
            })
          }
          hasExtra>
          {stringifyLocation(location) || translate('screens.new.addLocation')}
        </UIListItem>
        <UISwitch value={useExtraInfo} onValueChange={setUseExtraInfo}>
          {translate('screens.new.useExtraInfo')}
        </UISwitch>
        {useExtraInfo && (
          <>
            <View style={styles.uiSpacer} />
            <UIText>{translate('easterEggs.placeholder')}</UIText>
          </>
        )}
        <View style={styles.uiSpacer} />
        <UIButton
          onPress={() =>
            navigation.navigate(SCREEN_LITTEN_POST, {
              preview: true,
              litten,
              user,
            })
          }
          disabled={isSubmitting}
          fluid>
          {translate('screens.new.preview')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton onPress={submitForm} disabled={isSubmitting} fluid secondary>
          {translate('screens.new.post')}
        </UIButton>
        <View style={styles.uiSpacer} />
        <UIButton onPress={clearForm} disabled={isSubmitting} fluid danger>
          {translate('screens.new.clear')}
        </UIButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 18,
  },
  uiSpacer: {
    height: 20,
  },
})

export default NewForm

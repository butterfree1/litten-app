/**
 * @format
 * @flow
 */

import { UIPasswordInput } from 'ui-elements'
import { translate } from 'utils/i18n'

const StepPassword: (args: any) => React$Node = ({
  formRegister: { password, passwordConfirm, error, errorMessage },
  setPassword,
  setPasswordConfirm,
}) => (
  <>
    <UIPasswordInput
      value={password}
      placeholder={translate('forms.newPassword')}
      autoCorrect={false}
      autoCapitalize="none"
      textContentType="newPassword"
      onChangeText={setPassword}
      error={error?.password}
      errorMessage={errorMessage?.password}
    />
    <UIPasswordInput
      value={passwordConfirm}
      placeholder={translate('forms.confirmPassword')}
      autoCorrect={false}
      autoCapitalize="none"
      onChangeText={setPasswordConfirm}
      error={error?.passwordConfirm}
      errorMessage={errorMessage?.passwordConfirm}
    />
  </>
)

export default StepPassword

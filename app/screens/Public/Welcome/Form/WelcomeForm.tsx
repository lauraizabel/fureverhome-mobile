import {
  Button,
  Icon,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from 'app/components';
import { useAuth } from 'app/context/AuthContext';
import { colors, spacing } from 'app/theme';
import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useRef, useState } from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';

type WelcomeFormProps = {
  goToNextPage: () => void;
};

export interface LoginForm {
  email: string;
  password: string;
}

const defaultForm = {
  password: '',
  email: '',
};

export const WelcomeForm: FC<WelcomeFormProps> = observer(function LoginScreen(
  _props,
) {
  const authPasswordInput = useRef<TextInput>();
  const { goToNextPage } = _props;
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>(defaultForm);
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const error = '';

  const loginForm = () => {
    setAttemptsCount(attemptsCount + 1);
    login(form);
  };

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory_({ style }: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? 'view' : 'hidden'}
            color={colors.palette.neutral800}
            containerStyle={style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        );
      },
    [isAuthPasswordHidden],
  );

  const setFormValues = (value: string, textField: string) => {
    setForm({
      ...form,
      [textField]: value,
    });
  };

  return (
    <View>
      <TextField
        value={form.email}
        onChangeText={value => setFormValues(value, 'email')}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="E-mail"
        placeholder="Digite aqui o seu e-mail"
        helper={error}
        status={error ? 'error' : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <TextField
        value={form.password}
        onChangeText={value => setFormValues(value, 'password')}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="Senha"
        placeholder="Digite aqui a sua senha"
        onSubmitEditing={loginForm}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="ENTRAR"
        style={$tapButton}
        preset="reversed"
        onPress={loginForm}
      />

      <View style={$registerContainer}>
        <Text style={$registerText}>
          Não possui conta?{' '}
          <Text style={$goToRegisterText} onPress={goToNextPage}>
            Registrar
          </Text>
        </Text>
      </View>
    </View>
  );
});

const $registerContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const $registerText: TextStyle = {
  marginTop: 24,
};

const $goToRegisterText: TextStyle = {
  color: colors.palette.angry500,
  textTransform: 'uppercase',
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
};

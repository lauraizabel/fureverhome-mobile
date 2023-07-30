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
  goToHomePage: () => void;
};

export interface LoginForm {
  email: string;
  password: string;
}

const defaultForm = {
  password: '',
  email: '',
};

const defaultLogin = {
  password: 'mysecretpassword',
  email: 'johndoe@example.com',
};

export const WelcomeForm: FC<WelcomeFormProps> = observer(function LoginScreen(
  _props,
) {
  const authPasswordInput = useRef<TextInput>();
  const { goToNextPage, goToHomePage } = _props;
  const { login } = useAuth();

  const [form, setForm] = useState<LoginForm>(defaultLogin);
  const [error, setError] = useState<string>('');
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const loginForm = async () => {
    setAttemptsCount(attemptsCount + 1);
    try {
      await login(form);
      goToHomePage();
    } catch (_) {
      setError('Algo deu errado, cheque suas credenciais.');
    }
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
      {error && <Text style={$textError}>{error}</Text>}
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

const $textError: TextStyle = {
  color: colors.error,
  textAlign: 'center',
  marginBottom: 6,
  fontSize: 15,
};

const $registerContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
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

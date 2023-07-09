import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from 'app/components';
import { useStores } from 'app/models';
import { colors, spacing } from 'app/theme';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';

interface LoginScreenProps {}

export const WelcomeForm: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>();

  const [authPassword, setAuthPassword] = useState('');
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores();

  const error = isSubmitted ? validationError : '';

  function login() {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);

    if (validationError) return;

    setIsSubmitted(false);
    setAuthPassword('');
    setAuthEmail('');

    setAuthToken(String(Date.now()));
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? 'view' : 'hidden'}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        );
      },
    [isAuthPasswordHidden],
  );

  useEffect(() => {
    return () => {
      setAuthPassword('');
      setAuthEmail('');
    };
  }, []);

  return (
    <View>
      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
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
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        label="Senha"
        placeholder="Digite aqui a sua senha"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        text="ENTRAR"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />

      <Text text="Não possui conta? Registrar" style={$registerText} />
    </View>
  );
});

const $registerText: TextStyle = {
  marginTop: 10,
  justifyContent: 'center',
  alignItems: 'center',
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
};

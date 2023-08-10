import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react-lite';

import { Button, Text, TextField } from 'app/components';
import { colors, spacing } from 'app/theme';
import { ChangePasswordSchema } from 'app/data/dto/user/user.dto';
import { z } from 'zod';
import { userApi } from 'app/data/services/user/user.api';
import { useAuth } from 'app/context/AuthContext';

interface ChangePasswordProps {
  style?: StyleProp<ViewStyle>;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const defaultFormValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const ChangePassword = observer(function ChangePassword(
  props: ChangePasswordProps,
) {
  const { user } = useAuth();
  const { style } = props;
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    default: '',
  });

  const [form, setForm] = useState({
    ...defaultFormValues,
  });

  const onChangeForm = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleOpenModal = () => setOpenModal(prev => !prev);

  const onSubmit = async () => {
    try {
      setErrors({ ...defaultFormValues, default: '' });
      await ChangePasswordSchema.parse(form);
      await userApi.changePassword(form, user?.id as number);
      resetStates();
      toggleOpenModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          const fieldName = err.path[0] as keyof ChangePasswordFormValues;
          fieldErrors[fieldName] = err.message;
        });

        setErrors({ ...(fieldErrors as any) });
      } else {
        setErrors({
          ...errors,
          default: 'Algo de errado aconteceu, tente novamente.',
        });
      }
    }
  };

  const resetStates = () => {
    setForm({ ...defaultFormValues });
    setErrors({ ...defaultFormValues, default: '' });
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={openModal}
        onBackdropPress={toggleOpenModal}
        onBackButtonPress={toggleOpenModal}
      >
        <View style={$modalContent}>
          <View style={$modalInnerContent}>
            <TextField
              label="Senha atual"
              containerStyle={$textFieldContainer}
              secureTextEntry
              placeholder="Senha atual"
              onChangeText={value => onChangeForm('currentPassword', value)}
              status={errors.currentPassword ? 'error' : undefined}
              helper={errors.currentPassword}
            />
            <TextField
              label="Nova senha"
              containerStyle={$textFieldContainer}
              secureTextEntry
              placeholder="Nova senha"
              onChangeText={value => onChangeForm('newPassword', value)}
              status={errors.newPassword ? 'error' : undefined}
              helper={errors.newPassword}
            />
            <TextField
              label="Confirme nova senha"
              containerStyle={$textFieldContainer}
              secureTextEntry
              placeholder="Confirme nova senha"
              onChangeText={value => onChangeForm('confirmNewPassword', value)}
              helper={errors.confirmNewPassword}
              status={errors.confirmNewPassword ? 'error' : undefined}
            />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                backgroundColor: colors.palette.angry500,
                borderRadius: 8,
                padding: spacing.sm,
              }}
            >
              <Text
                style={{
                  color: colors.palette.neutral100,
                  fontWeight: '500',
                }}
              >
                {errors.default}
              </Text>
            </View>
          </View>
          <View style={$modalButtonContainer}>
            <TouchableOpacity
              style={$modalButtonStyle(colors.palette.primary500)}
              onPress={onSubmit}
            >
              <Text style={$modalButtonText(colors.palette.neutral100)}>
                Salvar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleOpenModal();
                resetStates();
              }}
              style={$modalButtonStyle('transparent', true)}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity style={[$container, style]} onPress={toggleOpenModal}>
        <Text style={[$text]}>Alterar senha</Text>
      </TouchableOpacity>
      {renderModal()}
    </>
  );
});

const $container: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.primary300,
  width: '100%',
  padding: spacing.md,
  justifyContent: 'center',
  alignItems: 'center',
};

const $text: TextStyle = {
  color: colors.palette.neutral100,
  fontWeight: '500',
  textTransform: 'capitalize',
};

const $modalContent: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: 8,
  padding: spacing.md,
  justifyContent: 'center',
  alignItems: 'center',
};

const $modalInnerContent: ViewStyle = {
  width: '85%',
};

const $textFieldContainer: ViewStyle = {
  marginBottom: spacing.md,
};

const $modalButtonContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  marginTop: spacing.lg,
  paddingBottom: spacing.md,
};

const $modalButtonStyle = (
  backgroundColor: string,
  isCancel = false,
): ViewStyle => ({
  backgroundColor,
  borderRadius: 8,
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.md,
  justifyContent: 'center',
  alignItems: 'center',
  ...(isCancel && {
    borderColor: colors.palette.primary500,
    borderWidth: 1,
  }),
});

const $modalButtonText = (color: string): TextStyle => ({
  color,
  fontWeight: '500',
  textTransform: 'capitalize',
});

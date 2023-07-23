import * as React from 'react';
import {
  Image,
  ImageStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors } from 'app/theme';
import { TextField } from 'app/components';
import { firstStepFields } from 'app/screens/Public/Register/Form/fields';
import * as ImagePicker from 'expo-image-picker';
import { ErrorFields } from 'app/screens/Public/Register/RegisterUserScreen';
import { CreateUserDto } from 'app/data/dto/user/user.dto';

export interface FirstStepProps {
  onChange: (key: string, value: unknown) => void;
  errors: ErrorFields;
  formValue: CreateUserDto;
}

export const FirstStep = observer(function FirstStep(props: FirstStepProps) {
  const { onChange, errors, formValue } = props;

  const $styles = [$container];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false,
    });

    if (result.canceled) {
      return;
    }

    onChange('picture', result.assets[0].uri);
  };

  const renderTextFields = () => {
    return firstStepFields.map((field, index) => {
      const fieldName = field.name;
      const error = errors[fieldName];
      const isLastTextField = index === firstStepFields.length - 1;

      return (
        <TextField
          containerStyle={
            isLastTextField ? $lastTextFieldStyle : $textFieldStyle
          }
          value={formValue[fieldName] || ''}
          placeholder={field.placeholder}
          label={field.label}
          key={fieldName}
          secureTextEntry={['password', 'confirmPassword'].includes(fieldName)}
          onChangeText={text => onChange(fieldName, text)}
          status={error ? 'error' : undefined}
          helper={error || undefined}
        />
      );
    });
  };

  return (
    <View style={$styles}>
      <View style={$containerImage}>
        <TouchableOpacity style={$containerImageUpload} onPress={pickImage}>
          {formValue.picture && (
            <Image
              source={{ uri: formValue.picture || '' }}
              style={$imageContainerUpload}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={$containerTextFields}>{renderTextFields()}</View>
    </View>
  );
});

const $containerTextFields: ViewStyle = {
  marginTop: 24,
};

const $container: ViewStyle = {
  justifyContent: 'center',
  marginTop: 36,
};

const $containerImage: ViewStyle = {
  justifyContent: 'center',
};

const $containerImageUpload: ViewStyle = {
  justifyContent: 'center',
  backgroundColor: colors.palette.secondary100,
  width: 300,
  height: 300,
  borderRadius: 500,
};

export const $imageContainerUpload: ImageStyle = {
  width: 300,
  height: 300,
  borderRadius: 500,
};

const $textFieldStyle: ViewStyle = {
  marginTop: 12,
};

const $lastTextFieldStyle: ViewStyle = {
  marginTop: 12,
  marginBottom: 24,
};

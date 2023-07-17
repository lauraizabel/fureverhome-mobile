import * as React from 'react';
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Picker } from '@react-native-picker/picker';
import { Text, TextField } from 'app/components';
import { colors } from 'app/theme';
import { states } from 'app/core/states';
import { ErrorFields } from 'app/screens/Public/Register/RegisterUserScreen';
import { CreateUserDto } from 'app/data/dto/user/user.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoWithLetters = require('../../../../../assets/images/logo-letters.png');

export interface ThirdStepProps {
  onChange: (key: string, value: unknown) => void;
  errors: ErrorFields[];
  formValue: CreateUserDto;
}

export const ThirdStep = observer(function ThirdStep(props: ThirdStepProps) {
  const { onChange, errors, formValue } = props;
  const $styles = [$container];

  const renderStates = () => {
    return states.map(state => (
      <Picker.Item label={state.nome} value={state.nome} key={state.id} />
    ));
  };

  return (
    <View style={$styles}>
      <View style={$containerImage}>
        <Image
          source={logoWithLetters}
          style={$imageStyle}
          resizeMethod="resize"
        />
      </View>
      <View style={$containerTextFields}>
        <View style={$textFieldStyle}>
          <TextField
            label="Longradouro"
            value={formValue.userAddress.street}
            placeholder="Digite seu longradouro"
            onChangeText={value => onChange('street', value)}
          />
        </View>
        <View style={$textFieldStyle}>
          <TextField
            label="Número"
            value={formValue.userAddress.number || ''}
            placeholder="Digite o número (opcional)"
            onChangeText={value => onChange('number', value)}
          />
        </View>
        <View style={$textFieldStyle}>
          <TextField
            label="Bairro"
            placeholder="Digite seu bairro"
            value={formValue.userAddress.neighborhood || ''}
            onChangeText={value => onChange('neighborhood', value)}
          />
        </View>
        <View style={[$textFieldStyle, $lastTextFieldStyle]}>
          <Text preset="formLabel" style={$pickerTitle}>
            Estado
          </Text>
          <Picker
            style={$picker}
            selectedValue={formValue.userAddress.state}
            onValueChange={value => onChange('state', value)}
          >
            {renderStates()}
          </Picker>
        </View>
      </View>
    </View>
  );
});

export const $pickerTitle: TextStyle = {
  marginBottom: 12,
};

export const $picker: ViewStyle = {
  backgroundColor: colors.palette.secondary100,
};

const $containerTextFields: ViewStyle = {
  marginTop: 24,
};

const $container: ViewStyle = {
  justifyContent: 'center',
  marginTop: 36,
  flex: 1,
};

const $containerImage: ViewStyle = {
  justifyContent: 'center',
};

const $textFieldStyle: ViewStyle = {
  marginTop: 12,
};

const $lastTextFieldStyle: ViewStyle = {
  marginTop: 12,
  marginBottom: 24,
};

export const $imageStyle: ImageStyle = {
  width: 280,
  height: 100,
  resizeMode: 'contain',
};

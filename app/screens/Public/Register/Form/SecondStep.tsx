import * as React from 'react';
import { Image, ImageStyle, TextStyle, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Picker } from '@react-native-picker/picker';
import { Text, TextField } from 'app/components';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { UserType } from 'app/enum/UserType';
import { colors, spacing, typography } from 'app/theme';
import { ErrorFields } from 'app/screens/Public/Register/RegisterUserScreen';
import { CreateUserDto } from 'app/data/dto/user/user.dto';
import { formatDate } from 'app/utils/formatDate';
import { TextInputMask } from 'react-native-masked-text';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoWithLetters = require('../../../../../assets/images/logo-letters.png');

export interface SecondStepProps {
  onChange: (key: string, value: unknown) => void;
  errors: ErrorFields[];
  formValue: CreateUserDto;
}

export const SecondStep = observer(function SecondStep(props: SecondStepProps) {
  const [date, setDate] = React.useState<string | null>(null);
  const { errors, formValue, onChange } = props;
  const $styles = [$container];

  const onChangeDate = (event, selectedDate: Date | undefined) => {
    if (selectedDate) {
      const currentDate = selectedDate;
      setDate(formatDate(currentDate.toISOString(), 'dd/MM/yyyy'));
      onChange('dateOfBirth', currentDate);
    }
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: formValue.dateOfBirth || new Date(),
      onChange: onChangeDate,
      mode: 'date',
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode();
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
          <Text
            preset="formLabel"
            text="Data de nascimento"
            style={$labelStyle}
          />
          <Text style={[$inputWrapperStyle]} onPress={showDatepicker}>
            <Text style={[$textDateWrapperStyle]}>
              {date || 'Selecione sua data de nascimento'}
            </Text>
          </Text>
        </View>
        <View style={$textFieldStyle}>
          <TextField
            label="Telefone"
            value={formValue.phone}
            placeholder="Digite seu telefone"
            maskedInput
            onChangeText={value => onChange('phone', value)}
            maskedInputOptions={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
          />
        </View>
        <View style={$textFieldStyle}>
          <TextField
            label="Profissão"
            value={formValue.job || ''}
            placeholder="Digite sua profissão (opcional)"
            onChangeText={value => onChange('job', value)}
          />
        </View>
        <View style={$textFieldStyle}>
          <TextField
            label="CPF"
            value={formValue.cpf || ''}
            placeholder="Digite seu CPF (opcional)"
            onChangeText={value => onChange('cpf', value)}
            maskedInput
            maskedInputType="cpf"
          />
        </View>

        <View style={[$textFieldStyle, $lastTextFieldStyle]}>
          <Text preset="formLabel" style={$pickerTitle}>
            Tipo de conta
          </Text>
          <Picker
            style={$picker}
            onValueChange={value => onChange('type', value)}
            selectedValue={formValue.type}
          >
            <Picker.Item label="Pessoa física" value={UserType.FISICAL} />
            <Picker.Item label="ONG" value={UserType.ONG} />
          </Picker>
        </View>
      </View>
    </View>
  );
});

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: 'hidden',
  height: 40,
};

const $textDateWrapperStyle: TextStyle = {
  fontFamily: typography.primary.regular,
  color: colors.text,
  fontSize: 16,
  marginVertical: spacing.xxs,
  marginHorizontal: spacing.xs,
};

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
};

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

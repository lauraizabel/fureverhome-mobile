import React, { FC, useState } from 'react';
import z from 'zod';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackScreenProps } from 'app/navigators';
import { Screen, Step } from 'app/components';
import { FirstStep } from 'app/screens/Public/Register/Form/FirstStep';
import { SecondStep } from 'app/screens/Public/Register/Form/SecondStep';
import { ThirdStep } from 'app/screens/Public/Register/Form/ThirdStep';
import {
  CreateUserDto,
  defaultCreateUserDto,
} from 'app/data/dto/user/user.dto';
import {
  firstStepFieldsValidation,
  secondStepFieldsValidation,
  thirdStepFieldsValidation,
} from 'app/screens/Public/Register/Form/validation';
import { userApi } from 'app/data/services/user/user.api';
import { IUserAddress } from 'app/data/models';

type RegisterUserScreenProps = NativeStackScreenProps<
  AppStackScreenProps<'RegisterUser'>
>;

export const firstStepRequiredFields = [
  'name',
  'lastName',
  'email',
  'password',
  'confirmPassword',
];

export interface ErrorFields {
  [key: string]: string;
}

export const RegisterUserScreen: FC<RegisterUserScreenProps> = observer(
  function RegisterUserScreen(props) {
    const { navigation } = props;
    const [formData, setFormData] = useState<CreateUserDto>({
      ...defaultCreateUserDto,
    } as CreateUserDto);
    const [currentStep, setCurrentStep] = useState(0);
    const [errorFields, setErrorFields] = useState<ErrorFields[]>([]);

    const verifyStepFields = (
      object: z.ZodType<any, any>,
      objectToValidate: CreateUserDto | Omit<IUserAddress, 'id'>,
    ): boolean => {
      try {
        object.parse(objectToValidate);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.issues.map(({ path, message }) => ({
            [path[0]]: message,
          }));
          setErrorFields(errors);
          return false;
        }
      }
      return false;
    };

    const incrementCurrentStep = () => setCurrentStep(currentStep + 1);
    const decrementCurretStep = () => setCurrentStep(currentStep - 1);

    const submitForm = async () => {
      try {
        console.log('hey there');
        const data = new FormData();

        const keys = Object.keys(formData);

        keys.forEach(key => {
          data.append(key, formData[key]);
        });
        console.log(data);
        const user = await userApi.register(data);
        if (user) {
          console.log(user);
        }
      } catch (error) {
        console.error({ error });
      }
    };

    const nextStep = () => {
      setErrorFields([]);

      const validateFields = {
        0: verifyStepFields(firstStepFieldsValidation, formData),
        1: verifyStepFields(secondStepFieldsValidation, formData),
        2: verifyStepFields(thirdStepFieldsValidation, formData.userAddress),
      };

      const isValid = validateFields[currentStep];

      console.log(isValid, errorFields);

      if (isValid && currentStep === 2) {
        submitForm();
        return;
      }
      if (isValid) {
        incrementCurrentStep();
      }
    };

    const prevStep = async () => {
      if (currentStep === 0) {
        setFormData({ ...defaultCreateUserDto });
        navigation.goBack();
        return;
      }

      decrementCurretStep();
    };

    const onChange = (key: string, value: unknown) => {
      setFormData({
        ...formData,
        [key]: value,
      });
    };

    const onChangeUserAddress = (key: string, value: unknown) => {
      setFormData({
        ...formData,
        userAddress: {
          ...formData.userAddress,
          [key]: value,
        },
      });
    };

    return (
      <Screen style={$root} preset="scroll">
        <Step
          allowBackButton
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          allowFinishButton
        >
          <FirstStep
            onChange={onChange}
            errors={errorFields}
            formValue={formData}
          />
          <SecondStep
            onChange={onChange}
            errors={errorFields}
            formValue={formData}
          />
          <ThirdStep
            onChange={onChangeUserAddress}
            errors={errorFields}
            formValue={formData}
          />
        </Step>
      </Screen>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
};

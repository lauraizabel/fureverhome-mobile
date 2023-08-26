import React, { FC, useState } from 'react';
import z from 'zod';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { AppStackScreenProps } from 'app/navigators';
import { Screen, Step } from 'app/components';
import { FirstStep } from 'app/screens/Public/Register/Form/FirstStep';
import { SecondStep } from 'app/screens/Public/Register/Form/SecondStep';
import { ThirdStep } from 'app/screens/Public/Register/Form/ThirdStep';
import {
  CreateUserDto,
  createUserDto,
  defaultCreateUserDto,
} from 'app/data/dto/user/user.dto';
import {
  firstStepFieldsValidation,
  secondStepFieldsValidation,
  thirdStepFieldsValidation,
} from 'app/screens/Public/Register/Form/validation';
import { userApi } from 'app/data/services/user/user.api';
import { useAuth } from '../../../context/AuthContext';

type RegisterUserScreenProps = AppStackScreenProps<'RegisterUser'>;

export interface ErrorFields {
  [key: string]: string;
}

export const RegisterUserScreen: FC<RegisterUserScreenProps> = observer(
  function RegisterUserScreen(props) {
    const { navigation } = props;
    const { login, setPicture } = useAuth();
    const [formData, setFormData] = useState<CreateUserDto>({
      ...createUserDto,
    } as CreateUserDto);
    const [currentStep, setCurrentStep] = useState(0);
    const [errorFields, setErrorFields] = useState<ErrorFields>({});

    const verifyStepFields = (
      object: z.ZodType<any, any>,
      objectToValidate: CreateUserDto,
    ): boolean => {
      try {
        object.parse(objectToValidate);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.issues.reduce((acc, { path, message }) => {
            acc[path[0]] = message;
            return acc;
          }, {} as { [key: string]: string });
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
        const resp = await userApi.register(formData);
        await login({ email: formData.email, password: formData.password });

        if (formData.picture) {
          const picture = await userApi.uploadPicture(
            resp.id as number,
            formData.picture,
          );
          if (picture) setPicture(picture);
        }

        navigation.navigate('Main', { screen: 'Homepage' });
      } catch (error) {
        setErrorFields({
          lastStep: 'Algo deu errado! Tente novamente mais tarde.',
        });
      }
    };

    const nextStep = () => {
      setErrorFields({});

      const validateFields = {
        0: verifyStepFields(firstStepFieldsValidation, formData),
        1: verifyStepFields(secondStepFieldsValidation, formData),
        2: verifyStepFields(thirdStepFieldsValidation, formData),
      };

      const isValid = validateFields[currentStep];

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
            onChange={onChange}
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

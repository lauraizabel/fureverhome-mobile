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
  defaultCreateUserDto,
} from 'app/data/dto/user/user.dto';
import {
  firstStepFieldsValidation,
  secondStepFieldsValidation,
  thirdStepFieldsValidation,
} from 'app/screens/Public/Register/Form/validation';
import { userApi } from 'app/data/services/user/user.api';
import { UserType } from 'app/enum/UserType';
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
      ...defaultCreateUserDto,
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

    const buildUserDto = data => {
      return {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        email: data.email,
        job: data.job,
        cpf: data.cpf,
        dateOfBirth: data.dateOfBirth,
        description: data.description,
        phone: data.phone,
        type: data.type,
        street: data.street,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        number: data.number,
      };
    };

    const submitForm = async () => {
      try {
        const submitData = { ...formData };
        if (submitData.type === UserType.ONG && submitData.ongName) {
          const [firstName, ...rest] = submitData.ongName.split(' ');
          submitData.firstName = firstName;
          submitData.lastName = rest.join(' ');
        }

        const resp = await userApi.register(
          buildUserDto(submitData) as CreateUserDto,
        );

        await login({ email: submitData.email, password: submitData.password });

        if (submitData.picture) {
          console.log('submitData.picture');
          const picture = await userApi.uploadPicture(
            resp.id as number,
            submitData.picture,
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

      if (currentStep === 0) {
        const valid = verifyStepFields(firstStepFieldsValidation, formData);
        if (!valid) return;
        incrementCurrentStep();
      }

      if (currentStep === 1) {
        const valid = verifyStepFields(secondStepFieldsValidation, formData);
        if (!valid) return;
        incrementCurrentStep();
      }

      if (currentStep === 2) {
        const valid = verifyStepFields(thirdStepFieldsValidation, formData);
        if (!valid) return;
        submitForm();
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

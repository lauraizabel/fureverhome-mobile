import React, { useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors } from 'app/theme';
import { Text } from 'app/components/Text';
import { useNavigation } from '@react-navigation/native';

export interface StepProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  nextStep?: () => void;
  prevStep?: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  allowBackButton?: boolean;
  allowFinishButton?: boolean;
}

/**
 * Describe your component here
 */
export const Step = observer(function Step(props: StepProps) {
  const {
    style,
    children,
    allowBackButton,
    nextStep,
    prevStep,
    currentStep,
    setCurrentStep,
    allowFinishButton,
  } = props;
  const $styles = [$container, style];
  const navigation = useNavigation();

  const totalSteps = React.Children.count(children);

  const handleNextStep = () => {
    if (nextStep) {
      nextStep();
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (prevStep) {
      prevStep();
      return;
    }

    if (currentStep === 0) {
      navigation.goBack();
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderDots = () => {
    const dots: JSX.Element[] = [];
    for (let i = 0; i < totalSteps; i += 1) {
      const dotStyle = i === currentStep ? $dotActive : $dotInactive;
      dots.push(<View key={i} style={dotStyle} />);
    }
    return dots;
  };

  const renderStep = () => {
    if (typeof children === 'object') {
      const steps = React.Children.toArray(children);

      if (currentStep >= 0 && currentStep < steps.length) {
        const step = steps[currentStep];

        return React.cloneElement(step as React.ReactElement);
      }
    }

    return null;
  };

  return (
    <View style={$styles}>
      {renderStep()}
      <View style={$dotContainer}>{renderDots()}</View>
      <View style={$buttonContainer}>
        {(allowFinishButton || currentStep < totalSteps - 1) && (
          <TouchableOpacity style={$button} onPress={handleNextStep}>
            <Text style={$buttonText}>Próximo</Text>
          </TouchableOpacity>
        )}
        {(allowBackButton || currentStep > 0) && (
          <TouchableOpacity style={$backButton} onPress={handlePrevStep}>
            <Text style={$backButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  flex: 1,
  alignItems: 'center',
};

const $dotContainer: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 16,
};

const $dotActive: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.palette.secondary500,
  marginHorizontal: 5,
};

const $dotInactive: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.palette.secondary200,
  marginHorizontal: 5,
};

const $buttonContainer: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  marginBottom: 16,
};

const $button: ViewStyle = {
  backgroundColor: colors.palette.primary600,
  height: 50,
  width: 180,
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 8,
  alignItems: 'center',
};

const $backButton: ViewStyle = {
  height: 50,
  width: 180,
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 8,
  alignItems: 'center',
};

const $buttonText: TextStyle = {
  color: colors.palette.neutral100,
  fontWeight: 'bold',
};

const $backButtonText: TextStyle = {
  color: colors.palette.primary600,
  fontWeight: 'bold',
  textDecorationStyle: 'dashed',
};

import React, { useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { colors, typography } from 'app/theme';
import { Text } from 'app/components/Text';

export interface StepProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  nextStep?: () => void;
  prevStep?: () => void;
}

/**
 * Describe your component here
 */
export const Step = observer(function Step(props: StepProps) {
  const { style, children } = props;
  const $styles = [$container, style];

  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = React.Children.count(children);

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderDots = () => {
    const dots = [];
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
        const stepProps: StepProps = {
          nextStep: handleNextStep,
          prevStep: handlePrevStep,
        };

        return React.cloneElement(step as React.ReactElement, stepProps);
      }
    }

    return null;
  };

  return (
    <View style={$container}>
      {renderStep()}
      <View style={$dotContainer}>{renderDots()}</View>
      <View style={$buttonContainer}>
        {currentStep < totalSteps - 1 && (
          <TouchableOpacity style={$button} onPress={handleNextStep}>
            <Text style={$buttonText}>Próximo</Text>
          </TouchableOpacity>
        )}
        {currentStep > 0 && (
          <TouchableOpacity style={$button} onPress={handlePrevStep}>
            <Text style={$buttonText}>Voltar</Text>
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
  backgroundColor: colors.palette.accent500,
  height: 50,
  width: 180,
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 8,
  alignItems: 'center',
};

const $buttonText: TextStyle = {
  color: colors.palette.angry500,
  fontWeight: 'bold',
};

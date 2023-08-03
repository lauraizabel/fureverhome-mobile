import { Linking } from 'react-native';

export const callPhoneNumber = async phoneNumber => {
  const url = `tel:${phoneNumber}`;
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

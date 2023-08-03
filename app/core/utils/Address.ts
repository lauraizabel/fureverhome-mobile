import { IUserAddress } from '../../data/models';

export const formatUserAddress = (userAddress: IUserAddress) => {
  if (userAddress) {
    let address = '';
    address = userAddress.street;
    if (userAddress.number) {
      address += `, ${userAddress.number}`;
    }
    address += ` - ${userAddress.city}, ${userAddress.state}`;
    return address;
  }
  return null;
};

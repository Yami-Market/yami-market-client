import { IMask } from 'react-imask';

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export const formatPhoneNumber = (phoneNumber: string) => {
  return IMask.createMask({
    mask: '(000) 000-0000'
  }).resolve(phoneNumber);
};

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${month}/${day}/${year}`;
};

import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import { useEffect, useMemo } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';

import { getShippingAddressesQuery } from '../../../api/addressApi';
import useAuth from '../../../hooks/useAuth';
import useCheckout from '../../../hooks/useCheckout';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import {
  setChangingAddress,
  setChangingCreditCard,
  setSelectedAddress
} from '../../../reducers/checkout/checkoutReducer';
import { formatPhoneNumber } from '../../../utils/string';
import AddressForm from '../../Form/AddressForm';
import AddressList from './AddressList';

const ShippingAddressPanel = () => {
  const { user } = useAuth();
  const addressesQuery = useQuery(getShippingAddressesQuery());
  const { changingAddress, selectedAddress, changingCreditCard } =
    useAppSelector(state => state.checkout);
  const dispatch = useAppDispatch();

  const { createAddress } = useCheckout();

  const addressList = useMemo(
    () =>
      addressesQuery.data
        ? _.orderBy(addressesQuery.data, 'created_at', 'desc')
        : [],
    [addressesQuery.data]
  );

  useEffect(() => {
    if (addressList.length === 0) {
      dispatch(setChangingAddress(true));
      dispatch(setSelectedAddress(null));
    } else {
      dispatch(setSelectedAddress(addressList[0]));
    }
  }, [addressList, dispatch]);

  return (
    <>
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          pb: changingCreditCard && addressList.length === 0 ? 3 : 0
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, flexGrow: 1 }}>
          1. Shipping Address
        </Typography>
        <Typography
          variant='body1'
          color='primary'
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          hidden={changingAddress}
          onClick={() => {
            dispatch(setChangingAddress(true));
            dispatch(setChangingCreditCard(false));
          }}
        >
          Change
        </Typography>
      </Stack>
      <Box>
        {addressList.length === 0 && !changingCreditCard ? (
          <Box sx={{ py: 3 }}>
            <AddressForm
              defaultAddress={{
                last_name: user?.last_name || '',
                first_name: user?.first_name || '',
                email: user?.email || ''
              }}
              handleAddressSubmit={async address => {
                await createAddress(address);
                dispatch(setChangingAddress(false));
                dispatch(setChangingCreditCard(true));
              }}
            />
            <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
              <Button type='submit' form='address-form' variant='text'>
                Save & Continue
              </Button>
            </Stack>
          </Box>
        ) : changingAddress ? (
          <Box sx={{ pt: 3 }}>
            <AddressList addressList={addressList} />
          </Box>
        ) : addressList.length !== 0 ? (
          <Box sx={{ py: 3 }}>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${selectedAddress?.first_name} ${selectedAddress?.last_name}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${selectedAddress?.street_address} ${selectedAddress?.optional_address}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${selectedAddress?.city}, ${selectedAddress?.state}
              ${selectedAddress?.zip_code} ${selectedAddress?.country}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {selectedAddress?.phone_number &&
                formatPhoneNumber(selectedAddress.phone_number)}
            </Typography>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default ShippingAddressPanel;

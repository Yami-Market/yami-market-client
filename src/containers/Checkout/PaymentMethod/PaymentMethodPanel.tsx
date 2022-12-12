import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material';

import { getShippingAddressesQuery } from '../../../api/addressApi';
import { getCreditCardsQuery } from '../../../api/creditCardApi';
import useCheckout from '../../../hooks/useCheckout';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon
} from '../../../icons/PaymentIcon';
import {
  setChangingAddress,
  setChangingCreditCard,
  setSelectedCreditCard
} from '../../../reducers/checkout/checkoutReducer';
import AddressForm, { AddressFormData } from '../../Form/AddressForm';
import CreditCardForm, { CreditCardFormData } from '../../Form/CreditCardForm';
import CreditCardList from './CreditCardList';

const PaymentMethodPanel = () => {
  const {
    changingAddress,
    changingCreditCard,
    selectedCreditCard,
    selectedAddress
  } = useAppSelector(state => state.checkout);

  const creditCardQuery = useQuery(getCreditCardsQuery());
  const addressesQuery = useQuery(getShippingAddressesQuery());

  const dispatch = useAppDispatch();

  const { createCreditCard } = useCheckout();

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [creditCardSubmit, setCreditCardSubmit] = useState(false);
  const [creditCardSubmitData, setCreditCardSubmitData] =
    useState<CreditCardFormData | null>(null);
  const [addressSubmit, setAddressSubmit] = useState(false);
  const [addressSubmitData, setAddressSubmitData] =
    useState<AddressFormData | null>(null);

  const addressList = useMemo(
    () =>
      addressesQuery.data
        ? _.orderBy(addressesQuery.data, 'created_at', 'desc')
        : [],
    [addressesQuery.data]
  );

  const creditCardList = useMemo(
    () =>
      creditCardQuery.data
        ? _.orderBy(creditCardQuery.data, 'created_at', 'desc')
        : [],
    [creditCardQuery.data]
  );

  const toggleSameAsShipping = () => {
    setSameAsShipping(!sameAsShipping);
  };

  useEffect(() => {
    if (creditCardList.length === 0) {
      dispatch(setSelectedCreditCard(null));
    } else {
      dispatch(setSelectedCreditCard(creditCardList[0]));
    }
  }, [creditCardList, dispatch]);

  useEffect(() => {
    if (creditCardSubmitData) {
      const [card_expiry_month, card_expiry_year] =
        creditCardSubmitData.card_expiry_date.split('/');

      if (sameAsShipping && selectedAddress) {
        createCreditCard(
          { ...creditCardSubmitData, card_expiry_month, card_expiry_year },
          selectedAddress
        ).then(() => {
          dispatch(setChangingCreditCard(false));
          setCreditCardSubmitData(null);
        });
      } else if (!sameAsShipping && addressSubmitData) {
        createCreditCard(
          { ...creditCardSubmitData, card_expiry_month, card_expiry_year },
          addressSubmitData
        ).then(() => {
          dispatch(setChangingCreditCard(false));
          setCreditCardSubmitData(null);
          setAddressSubmitData(null);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCardSubmitData, addressSubmitData]);

  const handleFormSubmit = () => {
    if (sameAsShipping) {
      setCreditCardSubmit(true);
    } else {
      setCreditCardSubmit(true);
      setAddressSubmit(true);
    }
  };

  return (
    <>
      <Stack
        direction='row'
        sx={{
          alignItems: 'center',
          pt: 3,
          pb: changingAddress && creditCardList.length === 0 ? 3 : 0
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, flexGrow: 1 }}>
          2. Payment Method
        </Typography>
        <Typography
          variant='body1'
          color='primary'
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          hidden={changingCreditCard}
          onClick={() => {
            dispatch(setChangingCreditCard(true));
            dispatch(setChangingAddress(false));
          }}
        >
          Change
        </Typography>
      </Stack>
      <Box>
        {creditCardList.length === 0 && !changingAddress ? (
          <Box sx={{ py: 3 }}>
            <CreditCardForm
              forceSubmit={creditCardSubmit}
              setForceSubmit={setCreditCardSubmit}
              handleCreditCardSubmit={async data =>
                setCreditCardSubmitData(data)
              }
            />
            <Box sx={{ mt: 3, mb: 1 }}>
              <Typography
                variant='body1'
                sx={{ mb: addressList.length === 0 ? 2 : 1 }}
              >
                Billing Address
              </Typography>
            </Box>
            {addressList.length !== 0 ? (
              <Box>
                <FormControlLabel
                  control={<Checkbox size='small' checked={sameAsShipping} />}
                  label='Same as shipping address'
                  onChange={toggleSameAsShipping}
                  sx={{ mb: sameAsShipping ? 0 : 2 }}
                />
              </Box>
            ) : (
              <></>
            )}
            {!sameAsShipping || addressList.length === 0 ? (
              <AddressForm
                forceSubmit={addressSubmit}
                setForceSubmit={setAddressSubmit}
                handleAddressSubmit={async data => setAddressSubmitData(data)}
              />
            ) : (
              <></>
            )}
            <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
              <Button variant='text' onClick={handleFormSubmit}>
                Save & Continue
              </Button>
            </Stack>
          </Box>
        ) : changingCreditCard ? (
          <Box sx={{ pt: 3 }}>
            <CreditCardList creditCardList={creditCardList} />
          </Box>
        ) : creditCardList.length !== 0 ? (
          <Stack direction='row' sx={{ py: 3 }}>
            {selectedCreditCard?.card_type === 'Visa' ? (
              <VisaIcon />
            ) : selectedCreditCard?.card_type === 'Mastercard' ? (
              <MasterCardIcon />
            ) : (
              <AmericanExpressIcon />
            )}
            <Box sx={{ pl: 2 }}>
              <Typography variant='body1' sx={{ fontWeight: 500 }}>
                {`${
                  selectedCreditCard?.card_type
                }  •••• ${selectedCreditCard?.card_number.slice(-4)}`}
              </Typography>
              <Typography variant='body1'>
                {selectedCreditCard?.card_holder_name}
              </Typography>
              <Typography variant='body1'>{`Expires ${selectedCreditCard?.card_expiry_month}/${selectedCreditCard?.card_expiry_year}`}</Typography>
            </Box>
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default PaymentMethodPanel;

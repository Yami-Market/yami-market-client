import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography
} from '@mui/material';

import { CreditCard } from '../../../api/creditCardApi';
import useCheckout from '../../../hooks/useCheckout';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { AddIcon } from '../../../icons/UIIcon';
import {
  setChangingCreditCard,
  setSelectedCreditCard
} from '../../../reducers/checkout/checkoutReducer';
import { formatPhoneNumber } from '../../../utils/string';
import AddressForm, { AddressFormData } from '../../Form/AddressForm';
import CreditCardForm, { CreditCardFormData } from '../../Form/CreditCardForm';
import CreditCardItem from './CreditCardItem';

export type CreditCardListProps = {
  creditCardList: CreditCard[];
};

const CreditCardList = ({ creditCardList }: CreditCardListProps) => {
  const [edit, setEdit] = useState(false);
  const [editCreditCard, setEditCreditCard] = useState<CreditCard | null>(null);
  const [create, setCreate] = useState(false);
  const { selectedAddress, selectedCreditCard } = useAppSelector(
    state => state.checkout
  );
  const dispatch = useAppDispatch();
  const { deleteCreditCard, createCreditCard, updateCreditCard } =
    useCheckout();
  const [newBillingAddress, setNewBillingAddress] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [creditCardSubmit, setCreditCardSubmit] = useState(false);
  const [creditCardSubmitData, setCreditCardSubmitData] =
    useState<CreditCardFormData | null>(null);
  const [addressSubmit, setAddressSubmit] = useState(false);
  const [addressSubmitData, setAddressSubmitData] =
    useState<AddressFormData | null>(null);

  const openEdit = (creditCard: CreditCard) => () => {
    console.log(creditCard);
    setEdit(true);
    setEditCreditCard(creditCard);
  };

  const closeEdit = () => {
    setEdit(false);
    setEditCreditCard(null);
    setNewBillingAddress(false);
  };

  const toggleCreate = () => {
    setCreate(!create);
    setSameAsShipping(true);
  };

  const toggleSameAsShipping = () => {
    setSameAsShipping(!sameAsShipping);
  };

  const toggleNewBillingAddress = () => {
    setNewBillingAddress(!newBillingAddress);
  };

  const handleSetSelectedCreditCard = (creditCard: CreditCard) => () => {
    dispatch(setSelectedCreditCard(creditCard));
  };

  const handleDeleteAddress = async () => {
    if (editCreditCard) {
      await deleteCreditCard(editCreditCard.id);
      closeEdit();
    }
  };

  useEffect(() => {
    if (edit) {
      if (
        !newBillingAddress &&
        creditCardSubmitData &&
        editCreditCard &&
        selectedAddress
      ) {
        const [card_expiry_month, card_expiry_year] =
          creditCardSubmitData.card_expiry_date.split('/');
        updateCreditCard(
          editCreditCard.id,
          {
            ...creditCardSubmitData,
            card_expiry_month,
            card_expiry_year
          },
          selectedAddress
        ).then(() => {
          closeEdit();
          setNewBillingAddress(false);
          setCreditCardSubmitData(null);
        });
      } else if (
        newBillingAddress &&
        creditCardSubmitData &&
        editCreditCard &&
        addressSubmitData
      ) {
        const [card_expiry_month, card_expiry_year] =
          creditCardSubmitData.card_expiry_date.split('/');

        updateCreditCard(
          editCreditCard.id,
          {
            ...creditCardSubmitData,
            card_expiry_month,
            card_expiry_year
          },
          addressSubmitData
        ).then(() => {
          closeEdit();
          setNewBillingAddress(false);
          setCreditCardSubmitData(null);
          setAddressSubmitData(null);
        });
      }
    } else if (create) {
      if (sameAsShipping && creditCardSubmitData && selectedAddress) {
        console.log(creditCardSubmitData, selectedAddress);
        const [card_expiry_month, card_expiry_year] =
          creditCardSubmitData.card_expiry_date.split('/');
        createCreditCard(
          { ...creditCardSubmitData, card_expiry_month, card_expiry_year },
          selectedAddress
        ).then(() => {
          toggleCreate();
          setSameAsShipping(true);
          setCreditCardSubmitData(null);
        });
      } else if (!sameAsShipping && creditCardSubmitData && addressSubmitData) {
        console.log(creditCardSubmitData, addressSubmitData);
        const [card_expiry_month, card_expiry_year] =
          creditCardSubmitData.card_expiry_date.split('/');
        createCreditCard(
          { ...creditCardSubmitData, card_expiry_month, card_expiry_year },
          addressSubmitData
        ).then(() => {
          toggleCreate();
          setSameAsShipping(true);
          setCreditCardSubmitData(null);
          setAddressSubmitData(null);
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditCardSubmitData, addressSubmitData]);

  const handleFormSubmit = () => {
    console.log('sameAsShipping', sameAsShipping);
    if (create) {
      if (sameAsShipping) {
        setCreditCardSubmit(true);
      } else {
        setCreditCardSubmit(true);
        setAddressSubmit(true);
      }
    } else if (edit) {
      if (newBillingAddress) {
        setCreditCardSubmit(true);
        setAddressSubmit(true);
      } else {
        setCreditCardSubmit(true);
      }
    }
  };

  return (
    <>
      {edit ? (
        <>
          <CreditCardForm
            defaultCreditCard={editCreditCard || undefined}
            forceSubmit={creditCardSubmit}
            setForceSubmit={setCreditCardSubmit}
            handleCreditCardSubmit={async data => setCreditCardSubmitData(data)}
          />
          <Box sx={{ mt: 3 }}>
            <Typography variant='body1' sx={{ mb: 1 }}>
              Billing Address
            </Typography>
            <Typography variant='body2' sx={{ mb: 0.5 }}>
              {`${editCreditCard?.billing_address.first_name} ${editCreditCard?.billing_address.last_name}`}
            </Typography>
            <Typography variant='body2' sx={{ mb: 0.5 }}>
              {`${editCreditCard?.billing_address.street_address} ${editCreditCard?.billing_address.optional_address}`}
            </Typography>
            <Typography variant='body2' sx={{ mb: 0.5 }}>
              {`${editCreditCard?.billing_address.city}, ${editCreditCard?.billing_address.state}
              ${editCreditCard?.billing_address.zip_code} ${editCreditCard?.billing_address.country}`}
            </Typography>
            <Typography variant='body2' sx={{ mb: 0.5 }}>
              {editCreditCard?.billing_address.phone_number &&
                formatPhoneNumber(editCreditCard.billing_address.phone_number)}
            </Typography>
          </Box>
          <FormControlLabel
            control={<Checkbox size='small' checked={newBillingAddress} />}
            label='Use a new billing address'
            onChange={toggleNewBillingAddress}
            sx={{ mb: newBillingAddress ? 2 : 0 }}
          />
          {newBillingAddress ? (
            <AddressForm
              forceSubmit={addressSubmit}
              setForceSubmit={setAddressSubmit}
              handleAddressSubmit={async data => setAddressSubmitData(data)}
            />
          ) : (
            <></>
          )}
          <Stack direction='row' sx={{ mt: 3 }}>
            <Button
              variant='text'
              color='error'
              sx={{ mr: 'auto' }}
              onClick={handleDeleteAddress}
            >
              Delete
            </Button>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: theme => theme.palette.text.secondary, mr: 1 }}
              onClick={closeEdit}
            >
              Cancel
            </Button>
            <Button variant='text' onClick={handleFormSubmit}>
              Save & Continue
            </Button>
          </Stack>
        </>
      ) : create ? (
        <>
          <CreditCardForm
            forceSubmit={creditCardSubmit}
            setForceSubmit={setCreditCardSubmit}
            handleCreditCardSubmit={async data => setCreditCardSubmitData(data)}
          />
          <Box sx={{ mt: 3, mb: 1 }}>
            <Typography variant='body1' sx={{ mb: 1 }}>
              Billing Address
            </Typography>
          </Box>
          <FormControlLabel
            control={<Checkbox size='small' checked={sameAsShipping} />}
            label='Same as shipping address'
            onChange={toggleSameAsShipping}
            sx={{ mb: sameAsShipping ? 0 : 2 }}
          />
          {!sameAsShipping ? (
            <AddressForm
              forceSubmit={addressSubmit}
              setForceSubmit={setAddressSubmit}
              handleAddressSubmit={async data => setAddressSubmitData(data)}
            />
          ) : (
            <></>
          )}
          <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: theme => theme.palette.text.secondary, mr: 1 }}
              onClick={toggleCreate}
            >
              Cancel
            </Button>
            <Button variant='text' onClick={handleFormSubmit}>
              Save & Continue
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack>
            {creditCardList.map(creditCard => (
              <CreditCardItem
                key={creditCard.id}
                creditCard={creditCard}
                selected={selectedCreditCard?.id === creditCard.id}
                setSelect={handleSetSelectedCreditCard}
                handleEdit={openEdit}
              />
            ))}
          </Stack>
          <Typography
            variant='body2'
            sx={{
              cursor: 'pointer',
              textDecoration: 'underline',
              mx: 1,
              display: 'inline'
            }}
            onClick={toggleCreate}
          >
            Add a new card
            <AddIcon size='sm' style={{ paddingLeft: '5px' }} />
          </Typography>
          <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: theme => theme.palette.text.secondary, mr: 1 }}
              onClick={() => {
                dispatch(setChangingCreditCard(false));
              }}
            >
              Cancel
            </Button>
            <Button
              variant='text'
              onClick={() => {
                dispatch(setChangingCreditCard(false));
              }}
            >
              Save & Continue
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default CreditCardList;

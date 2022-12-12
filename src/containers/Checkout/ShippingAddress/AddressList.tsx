import React, { useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { Address } from '../../../api/addressApi';
import useCheckout from '../../../hooks/useCheckout';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { AddIcon } from '../../../icons/UIIcon';
import {
  setChangingAddress,
  setChangingCreditCard,
  setSelectedAddress
} from '../../../reducers/checkout/checkoutReducer';
import AddressForm, { AddressFormData } from '../../Form/AddressForm';
import AddressItem from './AddressItem';

export type AddressListProps = {
  addressList: Address[];
};

const AddressList = ({ addressList }: AddressListProps) => {
  const [edit, setEdit] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [create, setCreate] = useState(false);
  const { createAddress, updateAddress, deleteAddress } = useCheckout();
  const checkout = useAppSelector(state => state.checkout);
  const dispatch = useAppDispatch();

  const openEdit = (address: Address) => () => {
    console.log(address);
    setEdit(true);
    setEditAddress(address);
  };

  const closeEdit = () => {
    setEdit(false);
    setEditAddress(null);
  };

  const toggleCreate = () => {
    setCreate(!create);
  };

  const handleSetSelectedAddress = (address: Address) => () => {
    dispatch(setSelectedAddress(address));
  };

  const handleUpdateAddressSubmit = async (address: AddressFormData) => {
    if (editAddress) {
      await updateAddress(editAddress.id, address);
      closeEdit();
    }
  };

  const handleDeleteAddress = async () => {
    if (editAddress) {
      await deleteAddress(editAddress.id);
      closeEdit();
    }
  };

  return (
    <>
      {edit ? (
        <>
          <AddressForm
            defaultAddress={editAddress || undefined}
            handleAddressSubmit={handleUpdateAddressSubmit}
          />
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
            <Button type='submit' form='address-form' variant='text'>
              Save & Continue
            </Button>
          </Stack>
        </>
      ) : create ? (
        <>
          <AddressForm
            handleAddressSubmit={async address => {
              await createAddress(address);
              toggleCreate();
            }}
          />
          <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: theme => theme.palette.text.secondary, mr: 1 }}
              onClick={toggleCreate}
            >
              Cancel
            </Button>
            <Button type='submit' form='address-form' variant='text'>
              Save & Continue
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Stack>
            {addressList.map(address => (
              <AddressItem
                key={address.id}
                address={address}
                selected={checkout.selectedAddress?.id === address.id}
                setSelect={handleSetSelectedAddress}
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
            Add a new address
            <AddIcon size='sm' style={{ paddingLeft: '5px' }} />
          </Typography>
          <Stack direction='row' sx={{ justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant='text'
              color='inherit'
              sx={{ color: theme => theme.palette.text.secondary, mr: 1 }}
              onClick={() => {
                dispatch(setChangingAddress(false));
              }}
            >
              Cancel
            </Button>
            <Button
              variant='text'
              onClick={() => {
                dispatch(setChangingAddress(false));
                if (checkout.selectedCreditCard === null) {
                  dispatch(setChangingCreditCard(true));
                }
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

export default AddressList;

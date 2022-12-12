import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Address } from '../../../api/addressApi';
import { formatPhoneNumber } from '../../../utils/string';

type AddressBoxProps = {
  address: Address;
  selected: boolean;
  setSelect: (address: Address) => () => void;
  handleEdit: (address: Address) => () => void;
};

const AddressItem = (props: AddressBoxProps) => {
  const { selected, setSelect, handleEdit, address } = props;

  return (
    <Box
      sx={theme => ({
        px: 3,
        pt: 2,
        pb: 3,
        mb: 2,
        width: '350px',
        cursor: 'pointer',
        backgroundColor: theme.palette.action.hover,
        border: '1px solid',
        borderColor: selected ? theme.palette.text.primary : 'transparent',
        borderRadius: 1
      })}
      onClick={setSelect(address)}
    >
      <Stack direction='row' sx={{ alignItems: 'center' }}>
        <Typography variant='h6' sx={{ py: 1, flexGrow: 1 }}>
          {`${address.first_name} ${address.last_name}`}
        </Typography>
        <Typography
          variant='body2'
          color='primary'
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleEdit(address)}
        >
          Edit
        </Typography>
      </Stack>
      <Typography variant='body1' sx={{ py: 0.2 }}>
        {`${address.street_address} ${address.optional_address}`}
      </Typography>
      <Typography variant='body1' sx={{ py: 0.2 }}>
        {`${address.city}, ${address.state}
              ${address.zip_code} ${address.country}`}
      </Typography>
      <Typography variant='body1'>
        {formatPhoneNumber(address.phone_number)}
      </Typography>
    </Box>
  );
};

export default AddressItem;

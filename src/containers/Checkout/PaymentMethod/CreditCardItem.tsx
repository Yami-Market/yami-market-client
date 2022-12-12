import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { CreditCard } from '../../../api/creditCardApi';
import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon
} from '../../../icons/PaymentIcon';

type CreditCardProps = {
  creditCard: CreditCard;
  selected: boolean;
  setSelect: (creditCard: CreditCard) => () => void;
  handleEdit: (creditCard: CreditCard) => () => void;
};

const CreditCardItem = (props: CreditCardProps) => {
  const { creditCard, selected, handleEdit, setSelect } = props;

  const creditCardTypeIcon = (type: string) => {
    switch (type) {
      case 'Visa':
        return <VisaIcon sx={{ fontSize: 60 }} />;
      case 'Mastercard':
        return <MasterCardIcon sx={{ fontSize: 60 }} />;
      case 'American Express':
        return <AmericanExpressIcon sx={{ fontSize: 60 }} />;
    }
  };

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
      onClick={setSelect(creditCard)}
    >
      <Stack direction='row' sx={{ alignItems: 'center' }}>
        <Typography variant='body1' sx={{ py: 1, flexGrow: 1 }}>
          {creditCard.card_holder_name}
        </Typography>
        <Typography
          variant='body2'
          color='primary'
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleEdit(creditCard)}
        >
          Edit
        </Typography>
      </Stack>
      <Typography variant='h6' sx={{ pt: 2 }}>
        {`•••• •••• •••• •••• ${creditCard.card_number.slice(-4)}`}
      </Typography>
      <Stack direction='row' sx={{ alignItems: 'center' }}>
        <Typography variant='body1' sx={{ flexGrow: 1 }}>
          {`Expires ${creditCard?.card_expiry_month}/${creditCard?.card_expiry_year}`}
        </Typography>
        {creditCardTypeIcon(creditCard.card_type)}
      </Stack>
    </Box>
  );
};

export default CreditCardItem;

import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { getCreditCardsQuery } from '../api/creditCardApi';
import Loading from '../components/Backdrop/Loading';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon
} from '../icons/PaymentIcon';

const Card = () => {
  const creditCardQuery = useQuery(getCreditCardsQuery());

  if (creditCardQuery.isLoading) {
    return <Loading />;
  }

  const creditCardList = creditCardQuery.data
    ? _.orderBy(creditCardQuery.data, 'created_at', 'desc')
    : [];

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
    <>
      <Helmet title='Credit Card' />
      <Box sx={{ px: 5, maxWidth: '1600px' }}>
        <Typography variant='h4' color='primary'>
          Credit Cards
        </Typography>
      </Box>
      <BlackDivider sx={{ mt: 3 }} />
      <Stack direction='row' flexWrap='wrap' sx={{ p: 3, minHeight: '250px' }}>
        {creditCardList.map(creditCard => (
          <Box
            key={creditCard.id}
            sx={theme => ({
              px: 3,
              pt: 2,
              pb: 3,
              m: 3,
              width: '350px',
              cursor: 'pointer',
              backgroundColor: theme.palette.action.hover,
              borderRadius: 1
            })}
          >
            <Stack direction='row' sx={{ alignItems: 'center' }}>
              <Typography variant='body1' sx={{ py: 1, flexGrow: 1 }}>
                {creditCard.card_holder_name}
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
        ))}
      </Stack>
    </>
  );
};

export default Card;

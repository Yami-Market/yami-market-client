/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material';

import { CreditCard } from '../../api/creditCardApi';
import CreditCardNumberMask from '../../components/Mask/CreditCardNumberMask';
import ExpirationDateMask from '../../components/Mask/ExpirationDateMask';
import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon
} from '../../icons/PaymentIcon';

export type CreditCardProps = {
  formId?: string;
  forceSubmit?: boolean;
  setForceSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultCreditCard?: Partial<CreditCard>;
  handleCreditCardSubmit: (data: CreditCardFormData) => Promise<void>;
};

export type CreditCardFormData = {
  card_type: string;
  card_number: string;
  card_holder_name: string;
  card_expiry_date: string; // MM/YY
  cvv_code: string;
};

const schema = z.object({
  card_type: z.string().trim().min(1, { message: 'Card type is required' }),
  card_number: z
    .string()
    .trim()
    .min(1, { message: 'Card number is required' })
    .length(16, { message: 'Card number is invalided' }),
  card_holder_name: z
    .string()
    .trim()
    .min(1, { message: 'Card holder name is required' })
    .max(50, { message: 'Card holder name must be less than 50 characters' }),
  card_expiry_date: z
    .string()
    .trim()
    .min(1, { message: 'Card expiry date is required' })
    .length(5, { message: 'Card expiry date is invalided' }),
  cvv_code: z
    .string()
    .trim()
    .min(1, { message: 'CVV code is required' })
    .min(3, { message: 'CVV code must be less than 3 characters' })
    .max(4, { message: 'CVV code is invalid' })
});

const CreditCardForm = (props: CreditCardProps) => {
  const {
    formId,
    defaultCreditCard,
    forceSubmit,
    setForceSubmit,
    handleCreditCardSubmit
  } = props;
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreditCardFormData>({
    defaultValues: {
      card_type: defaultCreditCard?.card_type || '',
      card_number: defaultCreditCard?.card_number || '',
      card_holder_name: defaultCreditCard?.card_holder_name || '',
      card_expiry_date:
        defaultCreditCard?.card_expiry_month &&
        defaultCreditCard?.card_expiry_year
          ? `${defaultCreditCard?.card_expiry_month}/${defaultCreditCard?.card_expiry_year}`
          : '',
      cvv_code: defaultCreditCard?.cvv_code || ''
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(
    async data => {
      console.log(data);
      await handleCreditCardSubmit(data);
    },
    () => {
      setForceSubmit && setForceSubmit(false);
    }
  );

  useEffect(() => {
    if (forceSubmit) {
      onSubmit().finally(() => {
        setForceSubmit && setForceSubmit(false);
      });
    }
  }, [forceSubmit]);

  return (
    <form id={formId || 'credit-card-form'} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <FormControl fullWidth error={!!errors.card_type}>
          <FormLabel sx={{ mb: 1 }}>Credit Card Type *</FormLabel>
          <Controller
            name='card_type'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                sx={{
                  justifyContent: 'space-around'
                }}
              >
                <FormControlLabel
                  value='Visa'
                  control={<Radio />}
                  label={
                    <Stack direction='row' sx={{ alignItems: 'center' }}>
                      Visa
                      <VisaIcon sx={{ fontSize: 40, ml: 1 }} />
                    </Stack>
                  }
                />
                <FormControlLabel
                  value='Mastercard'
                  control={<Radio />}
                  label={
                    <Stack direction='row' sx={{ alignItems: 'center' }}>
                      MasterCard
                      <MasterCardIcon sx={{ fontSize: 40, ml: 1 }} />
                    </Stack>
                  }
                />
                <FormControlLabel
                  value='American Express'
                  control={<Radio />}
                  label={
                    <Stack direction='row' sx={{ alignItems: 'center' }}>
                      American Express
                      <AmericanExpressIcon sx={{ fontSize: 40, ml: 1 }} />
                    </Stack>
                  }
                />
              </RadioGroup>
            )}
          />
          <FormHelperText>{errors.card_type?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.card_holder_name}>
          <InputLabel>Cardholder Name *</InputLabel>
          <Controller
            name='card_holder_name'
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 50 }}
            render={({ field }) => (
              <OutlinedInput {...field} type='text' label='Cardholder Name *' />
            )}
          />
          <FormHelperText>{errors.card_holder_name?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.card_number}>
          <InputLabel>Card Number *</InputLabel>
          <Controller
            name='card_number'
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 20 }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type='text'
                label='Card Number *'
                inputComponent={
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  CreditCardNumberMask as any
                }
              />
            )}
          />
          <FormHelperText>{errors.card_number?.message}</FormHelperText>
        </FormControl>
        <Stack direction='row' spacing={3}>
          <FormControl fullWidth error={!!errors.card_expiry_date}>
            <InputLabel>Expiration MM/YY *</InputLabel>
            <Controller
              name='card_expiry_date'
              control={control}
              rules={{ required: true, minLength: 4, maxLength: 5 }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type='text'
                  label='Expiration MM/YY *'
                  inputComponent={
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ExpirationDateMask as any
                  }
                />
              )}
            />
            <FormHelperText>{errors.card_expiry_date?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ width: '250px' }}
            error={!!errors.cvv_code}
          >
            <InputLabel>CVV *</InputLabel>
            <Controller
              name='cvv_code'
              control={control}
              rules={{ required: true, minLength: 3, maxLength: 4 }}
              render={({ field }) => (
                <OutlinedInput {...field} type='text' label='CVV *' />
              )}
            />
            <FormHelperText>{errors.cvv_code?.message}</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreditCardForm;

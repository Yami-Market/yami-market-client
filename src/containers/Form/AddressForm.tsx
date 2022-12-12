/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack
} from '@mui/material';

import { Address } from '../../api/addressApi';
import PhoneNumberMask from '../../components/Mask/PhoneNumberMask';

export type AddressFormProps = {
  formId?: string;
  forceSubmit?: boolean;
  setForceSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultAddress?: Partial<Address>;
  handleAddressSubmit: (address: AddressFormData) => Promise<void>;
};

export type AddressFormData = {
  first_name: string;
  last_name: string;
  street_address: string;
  optional_address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone_number: string;
  email: string;
};

const schema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be at most 50 characters' }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must be at most 50 characters' }),
  street_address: z
    .string()
    .trim()
    .min(1, { message: 'Street address is required' })
    .max(125, { message: 'Street address must be at most 125 characters' }),
  optional_address: z
    .string()
    .trim()
    .max(50, { message: 'Optional address must be at most 50 characters' }),
  city: z
    .string()
    .trim()
    .min(1, { message: 'City is required' })
    .max(25, { message: 'City must be at most 25 characters' }),
  state: z
    .string()
    .trim()
    .min(1, { message: 'State is required' })
    .max(25, { message: 'State must be at most 25 characters' }),
  country: z
    .string()
    .trim()
    .min(1, { message: 'Country is required' })
    .max(30, { message: 'Country must be at most 30 characters' }),
  zip_code: z
    .string()
    .trim()
    .min(1, { message: 'Zip code is required' })
    .max(20, { message: 'Zip code must be at most 20 characters' }),
  phone_number: z
    .string()
    .trim()
    .min(1, { message: 'Phone number is required' })
    .length(10, { message: 'Phone number must be 10 characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
});

const AddressForm = (props: AddressFormProps) => {
  const {
    formId,
    defaultAddress,
    handleAddressSubmit,
    forceSubmit,
    setForceSubmit
  } = props;
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<AddressFormData>({
    defaultValues: {
      first_name: defaultAddress?.first_name || '',
      last_name: defaultAddress?.last_name || '',
      street_address: defaultAddress?.street_address || '',
      optional_address: defaultAddress?.optional_address || '',
      city: defaultAddress?.city || '',
      state: defaultAddress?.state || '',
      country: defaultAddress?.country || '',
      zip_code: defaultAddress?.zip_code || '',
      phone_number: defaultAddress?.phone_number || '',
      email: defaultAddress?.email || ''
    },
    resolver: zodResolver(schema)
  });

  const [countryFlag, setCountryFlag] = useState(
    defaultAddress?.country || 'United States'
  );

  const watchCountry = watch(
    'country',
    defaultAddress?.country || 'United States'
  );

  const onSubmit = handleSubmit(
    async data => {
      console.log(data);
      await handleAddressSubmit(data);
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

  useEffect(() => {
    if (watchCountry === 'United States') {
      setCountryFlag('United States');
      if (
        defaultAddress?.state &&
        defaultAddress?.country === 'United States'
      ) {
        setValue('state', defaultAddress.state);
      } else {
        setValue('state', '');
      }
    } else {
      setCountryFlag('Canada');
      if (defaultAddress?.state && defaultAddress?.country === 'Canada') {
        setValue('state', defaultAddress.state);
      } else {
        setValue('state', '');
      }
    }
  }, [watchCountry]);

  return (
    <form id={formId || 'address-form'} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Stack direction='row' spacing={3}>
          <FormControl fullWidth error={!!errors.first_name}>
            <InputLabel>First Name *</InputLabel>
            <Controller
              name='first_name'
              control={control}
              rules={{ required: true, minLength: 1, maxLength: 50 }}
              render={({ field }) => (
                <OutlinedInput {...field} type='text' label='First Name *' />
              )}
            />
            <FormHelperText>{errors.first_name?.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={!!errors.last_name}>
            <InputLabel>Last Name *</InputLabel>
            <Controller
              name='last_name'
              control={control}
              rules={{ required: true, minLength: 1, maxLength: 50 }}
              render={({ field }) => (
                <OutlinedInput {...field} type='text' label='Last Name *' />
              )}
            />
            <FormHelperText>{errors.last_name?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <FormControl fullWidth error={!!errors.street_address}>
          <InputLabel>Street Address *</InputLabel>
          <Controller
            name='street_address'
            control={control}
            rules={{ required: true, minLength: 1, maxLength: 125 }}
            render={({ field }) => (
              <OutlinedInput {...field} type='text' label='Street Address *' />
            )}
          />
          <FormHelperText>{errors.street_address?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.optional_address}>
          <InputLabel>Apt, Suite, Unit, Bldg, Floor (Optional)</InputLabel>
          <Controller
            name='optional_address'
            control={control}
            rules={{ maxLength: 50 }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                type='text'
                label='Apt, Suite, Unit, Bldg, Floor (Optional)'
              />
            )}
          />
          <FormHelperText>{errors.optional_address?.message}</FormHelperText>
        </FormControl>
        <Stack direction='row' spacing={3}>
          <FormControl fullWidth error={!!errors.country}>
            <InputLabel>Country *</InputLabel>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select {...field} label='Country *'>
                  <MenuItem value='United States'>United States</MenuItem>
                  <MenuItem value='Canada'>Canada</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={!!errors.city}>
            <InputLabel>City *</InputLabel>
            <Controller
              name='city'
              control={control}
              rules={{ maxLength: 50 }}
              render={({ field }) => (
                <OutlinedInput {...field} type='text' label='City *' />
              )}
            />
            <FormHelperText>{errors.city?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <Stack direction='row' spacing={3}>
          <FormControl fullWidth error={!!errors.state}>
            <InputLabel>State / Province *</InputLabel>
            {countryFlag === 'United States' ? (
              <Controller
                name='state'
                control={control}
                defaultValue={defaultAddress?.state || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} label='State / Province *'>
                    <MenuItem value='AL'>AL</MenuItem>
                    <MenuItem value='AK'>AK</MenuItem>
                    <MenuItem value='AZ'>AZ</MenuItem>
                    <MenuItem value='AR'>AR</MenuItem>
                    <MenuItem value='CA'>CA</MenuItem>
                    <MenuItem value='CO'>CO</MenuItem>
                    <MenuItem value='CT'>CT</MenuItem>
                    <MenuItem value='DE'>DE</MenuItem>
                    <MenuItem value='DC'>DC</MenuItem>
                    <MenuItem value='FL'>FL</MenuItem>
                    <MenuItem value='GA'>GA</MenuItem>
                    <MenuItem value='GU'>GU</MenuItem>
                    <MenuItem value='HI'>HI</MenuItem>
                    <MenuItem value='ID'>ID</MenuItem>
                    <MenuItem value='IL'>IL</MenuItem>
                    <MenuItem value='IN'>IN</MenuItem>
                    <MenuItem value='IA'>IA</MenuItem>
                    <MenuItem value='KS'>KS</MenuItem>
                    <MenuItem value='KY'>KY</MenuItem>
                    <MenuItem value='LA'>LA</MenuItem>
                    <MenuItem value='ME'>ME</MenuItem>
                    <MenuItem value='MD'>MD</MenuItem>
                    <MenuItem value='MA'>MA</MenuItem>
                    <MenuItem value='MI'>MI</MenuItem>
                    <MenuItem value='MN'>MN</MenuItem>
                    <MenuItem value='MS'>MS</MenuItem>
                    <MenuItem value='MO'>MO</MenuItem>
                    <MenuItem value='MT'>MT</MenuItem>
                    <MenuItem value='NE'>NE</MenuItem>
                    <MenuItem value='NV'>NV</MenuItem>
                    <MenuItem value='NH'>NH</MenuItem>
                    <MenuItem value='NJ'>NJ</MenuItem>
                    <MenuItem value='NM'>NM</MenuItem>
                    <MenuItem value='NY'>NY</MenuItem>
                    <MenuItem value='NC'>NC</MenuItem>
                    <MenuItem value='ND'>ND</MenuItem>
                    <MenuItem value='OH'>OH</MenuItem>
                    <MenuItem value='OK'>OK</MenuItem>
                    <MenuItem value='OR'>OR</MenuItem>
                    <MenuItem value='PA'>PA</MenuItem>
                    <MenuItem value='PR'>PR</MenuItem>
                    <MenuItem value='RI'>RI</MenuItem>
                    <MenuItem value='SC'>SC</MenuItem>
                    <MenuItem value='SD'>SD</MenuItem>
                    <MenuItem value='TN'>TN</MenuItem>
                    <MenuItem value='TX'>TX</MenuItem>
                    <MenuItem value='UT'>UT</MenuItem>
                    <MenuItem value='VT'>VT</MenuItem>
                    <MenuItem value='VA'>VA</MenuItem>
                    <MenuItem value='WA'>WA</MenuItem>
                    <MenuItem value='WV'>WV</MenuItem>
                    <MenuItem value='WI'>WI</MenuItem>
                    <MenuItem value='WY'>WY</MenuItem>
                  </Select>
                )}
              />
            ) : (
              <Controller
                name='state'
                control={control}
                defaultValue={defaultAddress?.state || ''}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} label='State / Province *'>
                    <MenuItem value='AB'>AB</MenuItem>
                    <MenuItem value='BC'>BC</MenuItem>
                    <MenuItem value='MB'>MB</MenuItem>
                    <MenuItem value='NB'>NB</MenuItem>
                    <MenuItem value='NL'>NL</MenuItem>
                    <MenuItem value='NT'>NT</MenuItem>
                    <MenuItem value='NS'>NS</MenuItem>
                    <MenuItem value='NU'>NU</MenuItem>
                    <MenuItem value='ON'>ON</MenuItem>
                    <MenuItem value='PE'>PE</MenuItem>
                    <MenuItem value='QC'>QC</MenuItem>
                    <MenuItem value='SK'>SK</MenuItem>
                    <MenuItem value='YT'>YT</MenuItem>
                  </Select>
                )}
              />
            )}
            <FormHelperText>{errors.state?.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={!!errors.zip_code}>
            <InputLabel>Zip / Postal Code *</InputLabel>
            <Controller
              name='zip_code'
              control={control}
              rules={{ required: true, minLength: 1, maxLength: 20 }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type='text'
                  label='Zip / Postal Code *'
                />
              )}
            />
            <FormHelperText>{errors.zip_code?.message}</FormHelperText>
          </FormControl>
        </Stack>
        <Stack direction='row' spacing={3}>
          <FormControl fullWidth error={!!errors.phone_number}>
            <InputLabel>Phone Number *</InputLabel>
            <Controller
              name='phone_number'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type='text'
                  label='Phone Number *'
                  inputComponent={
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    PhoneNumberMask as any
                  }
                />
              )}
            />
            <FormHelperText>{errors.phone_number?.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={!!errors.email}>
            <InputLabel>Email *</InputLabel>
            <Controller
              name='email'
              control={control}
              rules={{ required: true, minLength: 1, maxLength: 50 }}
              render={({ field }) => (
                <OutlinedInput {...field} type='text' label='Email *' />
              )}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddressForm;

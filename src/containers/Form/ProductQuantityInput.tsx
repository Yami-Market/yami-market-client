import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export type CartProductQuantityProps = {
  quantity?: number;
  sx?: SxProps<Theme>;
  handleKeyDown: (quantity: number) => (event: React.KeyboardEvent) => void;
  handleProductSubmit: (quantity: number) => void;
  handleInputBlur?: (quantity: number) => void;
  handleMenuChange?: (quantity: number) => void;
  autoFocus: boolean;
};

type FormData = {
  quantity: number;
};

const CartProductQuantityInput = (props: CartProductQuantityProps) => {
  const {
    quantity,
    sx,
    handleKeyDown,
    handleProductSubmit,
    autoFocus,
    handleInputBlur,
    handleMenuChange
  } = props;
  const [quantityFlag, setQuantityFlag] = useState(quantity || 1);
  // const [inputFocus] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    resetField,
    getValues,
    formState: { errors, isDirty }
  } = useForm<FormData>({
    defaultValues: {
      quantity: quantity || 1
    }
  });

  useEffect(() => {
    setValue('quantity', quantity || 1);
    setQuantityFlag(quantity || 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const onSubmit = handleSubmit(({ quantity }) => {
    handleProductSubmit(quantity);
    resetField('quantity');
  });

  return (
    <form id='product-quantity-form' onSubmit={onSubmit}>
      <FormControl
        error={!!errors.quantity}
        size='small'
        sx={[{ width: 120 }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        <InputLabel>Quantity</InputLabel>
        {quantityFlag >= 10 ? (
          <Controller
            name='quantity'
            control={control}
            rules={{ required: true, min: 1, max: 999 }}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                size='small'
                label='Quantity'
                type='number'
                autoFocus={autoFocus || isDirty}
                onKeyDown={(event: React.KeyboardEvent) => {
                  const quantity = Math.floor(Number(getValues('quantity')));
                  handleKeyDown(quantity || 1)(event);
                }}
                onChange={event => {
                  const value = parseInt(event.target.value, 10);
                  if (value > 999) {
                    setError('quantity', {
                      type: 'max',
                      message: 'Max qty=999'
                    });
                    setValue('quantity', 999);
                    return;
                  }
                  field.onChange(event);
                }}
                onBlur={event => {
                  const value = parseInt(event.target.value || '0', 10);
                  if (value < 1) {
                    setValue('quantity', 1);
                    setQuantityFlag(1);
                    handleInputBlur && handleInputBlur(1);
                    setError('quantity', {
                      type: 'min',
                      message: 'Min qty=1'
                    });
                  } else {
                    clearErrors('quantity');
                    setValue('quantity', value);
                    setQuantityFlag(value);
                    handleInputBlur && handleInputBlur(value);
                  }
                  field.onBlur();
                }}
              />
            )}
          />
        ) : (
          <Controller
            name='quantity'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                autoFocus={isDirty}
                label='Quantity'
                onChange={event => {
                  const value = Number(event.target.value);
                  setQuantityFlag(value);
                  handleMenuChange && handleMenuChange(value);
                  clearErrors('quantity');
                  field.onChange(event);
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <Divider />
                <MenuItem value={10}>10+</MenuItem>
              </Select>
            )}
          />
        )}
        <FormHelperText>{errors.quantity?.message || ''}</FormHelperText>
      </FormControl>
    </form>
  );
};

export default CartProductQuantityInput;

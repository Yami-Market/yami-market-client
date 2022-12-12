import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CloseIcon } from '../../icons/UIIcon';
import { wait } from '../../utils/wait';

export type AuthFormProps = {
  title: string;
  buttonText: string;
  footer: React.ReactNode;
  serverErrorMessage?: string;
  handleAuthSubmit: (username: string, password: string) => Promise<void>;
};

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be at most 20 characters' })
});

const AuthForm = (props: AuthFormProps) => {
  const { title, buttonText, footer, serverErrorMessage, handleAuthSubmit } =
    props;
  const [showPassword, setShowPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const theme = useTheme();
  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit(async data => {
    setErrorAlert(false);
    await wait(0.2);
    await handleAuthSubmit(data.email, data.password);
    setErrorAlert(true);
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: { xs: 400 },
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant='h6' sx={{ textAlign: 'center', mt: 3 }}>
        {title}
      </Typography>

      <Collapse in={errorAlert && serverErrorMessage !== ''}>
        <Alert
          variant='outlined'
          severity='error'
          action={
            <IconButton
              color='error'
              size='small'
              onClick={() => {
                setErrorAlert(false);
              }}
            >
              <CloseIcon color={theme.palette.error.main} />
            </IconButton>
          }
          sx={{ width: 320, py: 1, margin: 'auto', mt: 2 }}
        >
          {serverErrorMessage}
        </Alert>
      </Collapse>

      <Divider sx={{ width: '90%', margin: 'auto', mt: 2, mb: 2 }} />

      <form onSubmit={onSubmit}>
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <FormControl
            error={!!errors.email}
            sx={{
              width: 320,
              height: 50,
              mb: errors.email ? 5 : 3
            }}
          >
            <InputLabel>Email</InputLabel>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type='text'
                  label='Email'
                  onChange={event => {
                    clearErrors('email');
                    field.onChange(event);
                  }}
                />
              )}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>
          <FormControl
            error={!!errors.password}
            sx={{
              width: 320,
              height: 50,
              mb: errors.password ? 5 : 3
            }}
          >
            <InputLabel>Password</InputLabel>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  label='Password'
                  endAdornment={
                    <InputAdornment position='start'>
                      <IconButton
                        color='primary'
                        edge='end'
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={event => {
                    clearErrors('password');
                    field.onChange(event);
                  }}
                />
              )}
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Button type='submit' variant='contained' sx={{ width: 320 }}>
            {buttonText}
          </Button>
        </Stack>
      </form>

      <Divider sx={{ width: '90%', margin: 'auto', mt: 2, mb: 2 }} />

      <Box sx={{ textAlign: 'center', mb: 5 }}>{footer}</Box>
    </Box>
  );
};

export default AuthForm;

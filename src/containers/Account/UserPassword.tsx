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
  Dialog,
  DialogContent,
  DialogTitle,
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

import useAuth from '../../hooks/useAuth';
import { CloseIcon } from '../../icons/UIIcon';
import { wait } from '../../utils/wait';

export type UserPasswordFormData = {
  current_password: string;
  new_password: string;
};

const schema = z.object({
  current_password: z
    .string()
    .trim()
    .min(1, { message: 'Current password is required' })
    .min(8, { message: 'Current password must be at least 8 characters' })
    .max(20, { message: 'Current password must be at most 20 characters' }),
  new_password: z
    .string()
    .trim()
    .min(1, { message: 'New password is required' })
    .min(8, { message: 'New password must be at least 8 characters' })
    .max(20, { message: 'New password must be at most 20 characters' })
});

const UserPassword = () => {
  const { resetPassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserPasswordFormData>({
    defaultValues: {
      current_password: '',
      new_password: ''
    },
    resolver: zodResolver(schema)
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit(async data => {
    setErrorAlert(false);
    setErrorMessage('');
    await wait(0.3);
    console.log(data);
    try {
      await resetPassword(data);
      handleClose();
    } catch (error) {
      console.log(error);
      setErrorAlert(true);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  });

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <>
      <Box>
        <Typography variant='body1' color='text.secondary'>
          Password
        </Typography>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '18px', flexGrow: 1 }}>
            ••••••••••••
          </Typography>
          <Typography
            variant='body2'
            color='primary'
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleClickOpen}
          >
            Change
          </Typography>
        </Stack>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              Change Your Password
            </Typography>
            <IconButton
              sx={{
                width: '30px',
                height: '30px',
                color: 'text.secondary'
              }}
              onClick={handleClose}
            >
              <CloseIcon size='sm' />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Collapse in={errorAlert}>
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
              sx={{ width: 320, py: 1, margin: 'auto', my: 2 }}
            >
              {errorMessage}
            </Alert>
          </Collapse>

          <form onSubmit={onSubmit}>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={3}
              sx={{ mt: 2 }}
            >
              <FormControl fullWidth error={!!errors.current_password}>
                <InputLabel>Current Password *</InputLabel>
                <Controller
                  name='current_password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      type={showCurrentPassword ? 'text' : 'password'}
                      label='Current Password *'
                      endAdornment={
                        <InputAdornment position='start'>
                          <IconButton
                            color='primary'
                            edge='end'
                            onClick={handleClickShowCurrentPassword}
                          >
                            {showCurrentPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>
                  {errors.current_password?.message}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.new_password}>
                <InputLabel>New Password *</InputLabel>
                <Controller
                  name='new_password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      type={showNewPassword ? 'text' : 'password'}
                      label='New Password *'
                      endAdornment={
                        <InputAdornment position='start'>
                          <IconButton
                            color='primary'
                            edge='end'
                            onClick={handleClickShowNewPassword}
                          >
                            {showNewPassword ? (
                              <VisibilityOffOutlinedIcon />
                            ) : (
                              <VisibilityOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>{errors.new_password?.message}</FormHelperText>
              </FormControl>
              <Button variant='contained' fullWidth type='submit'>
                Save
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserPassword;

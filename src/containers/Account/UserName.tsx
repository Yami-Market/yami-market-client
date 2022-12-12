import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import useAuth from '../../hooks/useAuth';
import { CloseIcon } from '../../icons/UIIcon';

export type UserNameFormData = {
  first_name: string;
  last_name: string;
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
    .max(50, { message: 'Last name must be at most 50 characters' })
});

const UserName = () => {
  const { user, updateUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserNameFormData>({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || ''
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
    // console.log(data);
    await updateUserProfile({ ...user, ...data });
    handleClose();
  });

  return (
    <>
      <Box>
        <Typography variant='body1' color='text.secondary'>
          Name
        </Typography>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '18px', flexGrow: 1 }}>
            {user.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : 'None'}
          </Typography>
          <Typography
            variant='body2'
            color='primary'
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleClickOpen}
          >
            Edit
          </Typography>
        </Stack>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography variant='h5' sx={{ flexGrow: 1 }}>
              Edit Your Name
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
          <form onSubmit={onSubmit}>
            <Stack
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={3}
              sx={{ mt: 2 }}
            >
              <FormControl fullWidth error={!!errors.first_name}>
                <InputLabel>First Name *</InputLabel>
                <Controller
                  name='first_name'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      type='text'
                      label='First Name *'
                    />
                  )}
                />
                <FormHelperText>{errors.first_name?.message}</FormHelperText>
              </FormControl>
              <FormControl fullWidth error={!!errors.last_name}>
                <InputLabel>Last Name *</InputLabel>
                <Controller
                  name='last_name'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} type='text' label='Last Name *' />
                  )}
                />
                <FormHelperText>{errors.last_name?.message}</FormHelperText>
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

export default UserName;

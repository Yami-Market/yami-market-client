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
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';

import useAuth from '../../hooks/useAuth';
import { CloseIcon } from '../../icons/UIIcon';
import { capitalizeFirstLetter } from '../../utils/string';

export type UserGenderFormData = {
  gender: string;
};

const schema = z.object({
  gender: z.enum(['Male', 'Female', 'Others'])
});

const UserGender = () => {
  const { user, updateUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserGenderFormData>({
    defaultValues: {
      gender: user.gender ? capitalizeFirstLetter(user.gender) : ''
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
    await updateUserProfile({ ...user, gender: data.gender.toLowerCase() });
    handleClose();
  });

  return (
    <>
      <Box>
        <Typography variant='body1' color='text.secondary'>
          Gender
        </Typography>
        <Stack direction='row' sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '18px', flexGrow: 1 }}>
            {user.gender ? capitalizeFirstLetter(user.gender) : 'None'}
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
              Edit Your Gender
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
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender *</InputLabel>
                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label='Gender *'>
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                      <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.gender && 'Invalid gender'}
                </FormHelperText>
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

export default UserGender;

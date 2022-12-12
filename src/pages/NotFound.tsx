import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Stack, Typography } from '@mui/material';

import Helmet from '../components/Helmet/Helmet';

const NotFound = () => {
  return (
    <>
      <Helmet />
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: '600px',
            textAlign: 'center',
            px: 3
          }}
        >
          <Typography variant='h1' color='text.primary'>
            404
          </Typography>
          <Typography variant='h5' color='text.primary' sx={{ py: 2 }}>
            Oops... looks like you got lost
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Something went wrong. Looks like this page doesn&apos;t exist
            anymore.
          </Typography>
          <Button
            component={RouterLink}
            to='/'
            variant='contained'
            sx={{ my: 3 }}
          >
            Go back to home
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default NotFound;

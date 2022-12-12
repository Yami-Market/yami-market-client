import { Backdrop, Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ height: 'calc(100vh - 65px)', width: '100vw' }}>
      <Backdrop open sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
};

export default Loading;

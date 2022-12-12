import { Outlet } from 'react-router-dom';

import { Box, List, ListItem, ListItemText, Stack } from '@mui/material';

import BlackDivider from '../components/Divider/BlackDivider';
import UserLayoutNavLink from '../components/Link/UserLayoutNavLink';

const UserLayout = () => {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Stack direction='row'>
        <Stack
          sx={{
            flexGrow: 1,
            position: 'sticky',
            height: '100%',
            top: '100px',
            minWidth: { md: '300px', xl: '500px' },
            maxWidth: { md: '300px', xl: '500px' }
          }}
        >
          <List sx={{ px: 2 }}>
            <ListItem>
              <Box sx={{ marginLeft: 'auto', minWidth: '200px' }}>
                <ListItemText
                  primary={
                    <UserLayoutNavLink
                      href='/account'
                      text='Account Information'
                    />
                  }
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ marginLeft: 'auto', minWidth: '200px' }}>
                <ListItemText
                  primary={<UserLayoutNavLink href='/order' text='Orders' />}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ marginLeft: 'auto', minWidth: '200px' }}>
                <ListItemText
                  primary={
                    <UserLayoutNavLink href='/address' text='Addresses' />
                  }
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{ marginLeft: 'auto', minWidth: '200px' }}>
                <ListItemText
                  primary={
                    <UserLayoutNavLink href='/card' text='Create Cards' />
                  }
                />
              </Box>
            </ListItem>
          </List>
        </Stack>
        <BlackDivider orientation='vertical' flexItem />
        <Stack sx={{ flexGrow: 1, mt: 3 }}>
          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserLayout;

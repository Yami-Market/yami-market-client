import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Divider,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';

import useAuth from '../../hooks/useAuth';
import useNavbar from '../../hooks/useNavbar';
import useThemeMode from '../../hooks/useThemeMode';
import {
  AccountIcon,
  AddressIcon,
  AngleDownIcon,
  CloseIcon,
  CreditCardIcon,
  LogoutIcon,
  ReceiptIcon
} from '../../icons/UIIcon';

export type UserLinkProps = {
  firstName: string | null;
};

const UserLink = ({ firstName }: UserLinkProps) => {
  const { resolvedTheme } = useThemeMode();
  const userRef = useRef(null);
  const { logout } = useAuth();
  const { accountAnchorEl, setAccountPopoverOpen, setAccountPopoverClose } =
    useNavbar();

  const open = Boolean(accountAnchorEl);

  return (
    <>
      <Box
        square
        component={Paper}
        elevation={open ? 1 : 0}
        sx={{
          height: resolvedTheme === 'dark' ? '62px' : '63px',
          display: 'flex',
          alignItems: 'center',
          pr: 0.5
        }}
        ref={userRef}
      >
        <Typography
          variant='body1'
          sx={{
            ml: 1,
            mr: 1,
            maxWidth: '145px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          Hello,{' '}
          <Link
            component={RouterLink}
            to='/order'
            color='inherit'
            underline='always'
            sx={theme => ({
              color: theme.palette.text.primary,
              '&:hover': {
                color: theme.palette.primary.main
              }
            })}
            // @ts-ignore
            onMouseEnter={setAccountPopoverOpen(userRef)}
            onClick={setAccountPopoverClose}
          >
            {firstName || 'Customer'}
          </Link>
        </Typography>
        <Box sx={{ width: '15px', display: 'flex', alignItems: 'center' }}>
          {open ? <CloseIcon /> : <AngleDownIcon />}
        </Box>
      </Box>
      <Menu
        autoFocus={false}
        anchorEl={accountAnchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        elevation={1}
        transitionDuration={0}
        onClose={setAccountPopoverClose}
        sx={{
          '&.MuiMenu-root': {
            top: '65px !important'
          }
        }}
        PaperProps={{
          onMouseLeave: setAccountPopoverClose,
          sx: {
            borderRadius: 0,
            position: 'fixed',
            top: '65px !important',
            width: '147px'
          }
        }}
        slotProps={{
          backdrop: {
            // @ts-ignore
            invisible: true,
            sx: { top: '65px !important' }
          }
        }}
      >
        <MenuItem
          component={RouterLink}
          to='/account'
          onClick={setAccountPopoverClose}
        >
          <ListItemIcon>
            <AccountIcon size='lg' />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          component={RouterLink}
          to='/order'
          onClick={setAccountPopoverClose}
        >
          <ListItemIcon>
            <ReceiptIcon size='lg' />
          </ListItemIcon>
          <ListItemText>Orders</ListItemText>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to='/address'
          onClick={setAccountPopoverClose}
        >
          <ListItemIcon>
            <AddressIcon size='lg' />
          </ListItemIcon>
          <ListItemText>Addresses</ListItemText>
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to='/card'
          onClick={setAccountPopoverClose}
        >
          <ListItemIcon>
            <CreditCardIcon size='lg' />
          </ListItemIcon>
          <ListItemText>Cards</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={async () => {
            setAccountPopoverClose();
            await logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon size='lg' />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserLink;

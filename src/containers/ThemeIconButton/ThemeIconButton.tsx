import React from 'react';

import { Box, IconButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import useNavbar from '../../hooks/useNavbar';
import useThemeMode from '../../hooks/useThemeMode';
import { DarkModeIcon, LightModeIcon } from '../../icons/UIIcon';

export type ThemeIconMenuProps = {
  sx?: SxProps<Theme>;
};

const ThemeIconButton = ({ sx }: ThemeIconMenuProps) => {
  const { resolvedTheme, toggleTheme } = useThemeMode();
  const { setAccountPopoverClose } = useNavbar();

  const handleThemeIcon = () => {
    switch (resolvedTheme) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
    }
  };

  return (
    <Box
      sx={[
        {
          marginLeft: { xs: 'auto', md: '0' }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      onMouseEnter={setAccountPopoverClose}
    >
      <IconButton
        color='primary'
        onClick={toggleTheme}
        sx={{
          color: theme => theme.palette.primary.main
        }}
      >
        {handleThemeIcon()}
      </IconButton>
    </Box>
  );
};

export default ThemeIconButton;

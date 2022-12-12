import { useState } from 'react';

import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled, useTheme } from '@mui/material/styles';

import useNavbar from '../../hooks/useNavbar';
import { SearchIcon } from '../../icons/UIIcon';

const Search = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.secondary, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.text.secondary, 0.1)
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'center'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  pointerEvents: 'none'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flexGrow: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `${theme.spacing(2)}`,
    width: '100%'
  }
}));

const SearchBar = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const theme = useTheme();
  const { setCategoryPopoverClose, setAccountPopoverClose } = useNavbar();

  const toggleInputFocus = () => {
    setInputFocused(!inputFocused);
  };

  return (
    <Search
      sx={{
        display: { xs: 'none', md: 'flex' }
      }}
      onMouseEnter={() => {
        setCategoryPopoverClose();
        setAccountPopoverClose();
      }}
    >
      <StyledInputBase
        placeholder='Search…'
        onFocus={toggleInputFocus}
        onBlur={toggleInputFocus}
      />
      <SearchIconWrapper>
        <SearchIcon
          color={inputFocused ? theme.palette.primary.main : 'inherit'}
        />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchBar;

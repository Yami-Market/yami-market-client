import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  components: {
    // MuiButtonBase: {
    //   defaultProps: {
    //     disableRipple: true
    //   }
    // }
  }
  // typography: {
  //   button: {
  //     textTransform: 'none'
  //   }
  // }
});

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#ff7005',
      light: '#ff8324',
      dark: '#e76501',
      contrastText: '#fff'
    }
  }
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff9443',
      light: '#ffa662',
      dark: '#ff8324',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    }
  }
});

import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

export type LoginLinkProps = {
  text?: string;
  state?: {
    callbackUrl?: string;
  };
};

const LoginLink = ({ text, state }: LoginLinkProps) => {
  return (
    <Link
      component={RouterLink}
      to='/login'
      // reloadDocument
      state={state}
      color='inherit'
      underline='always'
      sx={theme => ({
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
          color: theme.palette.primary.main
        }
      })}
    >
      {text || 'Login'}
    </Link>
  );
};

export default LoginLink;

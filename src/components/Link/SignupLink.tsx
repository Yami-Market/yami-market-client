import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

export type SignupLinkProps = {
  text?: string;
  state?: {
    callbackUrl?: string;
  };
};

const SignupLink = ({ text, state }: SignupLinkProps) => {
  return (
    <Link
      component={RouterLink}
      to='/signup'
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
      {text || 'Signup'}
    </Link>
  );
};

export default SignupLink;

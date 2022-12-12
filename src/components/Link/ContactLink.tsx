import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export type ContactLinkProps = {
  underline?: 'none' | 'hover' | 'always';
  sx?: SxProps<Theme>;
};
const ContactLink = ({ sx, underline }: ContactLinkProps) => {
  return (
    <Link
      component={RouterLink}
      to='/contact'
      // reloadDocument
      underline={underline || 'hover'}
      sx={[
        theme => ({
          px: 1,
          color: theme.palette.text.primary,
          '&:hover': {
            color: theme.palette.primary.main
          }
        }),
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      Contact Us
    </Link>
  );
};

export default ContactLink;

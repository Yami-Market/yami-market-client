import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

const AboutLink = () => {
  return (
    <Link
      component={RouterLink}
      to='/about'
      // reloadDocument
      underline='hover'
      sx={theme => ({
        px: 1,
        color: theme.palette.text.primary,
        '&:hover': {
          color: theme.palette.primary.main
        }
      })}
    >
      About Us
    </Link>
  );
};

export default AboutLink;

import { Box, Typography } from '@mui/material';

import AboutLink from '../Link/AboutLink';
import ContactLink from '../Link/ContactLink';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={theme => ({
        borderTop: `1px solid ${theme.palette.text.primary}`,
        display: { xs: 'none', md: 'block' },
        flexDirection: 'column'
      })}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, pb: 1 }}>
        <Box sx={{ margin: 'auto' }}>
          <AboutLink />
          |
          <ContactLink />
        </Box>
        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          component='div'
          sx={{ margin: 'auto', mt: 1 }}
        >
          © 2022 Yami Market.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

import { Box, Typography } from '@mui/material';

import Helmet from '../components/Helmet/Helmet';

const Contact = () => {
  return (
    <>
      <Helmet title='Contact Us' />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: 'auto',
          my: 6
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1440px',
            margin: 'auto',
            my: 6,
            px: 5
          }}
        >
          <Typography
            color='primary'
            variant='h4'
            sx={{
              fontWeight: 500
            }}
          >
            Contact Us
          </Typography>
          <Typography variant='h6' sx={{ pt: 5, pb: 2 }}>
            Customer Service
          </Typography>
          <Typography color='text.primary' variant='body1' sx={{ pb: 1 }}>
            Email: contact@yami.com
          </Typography>
          <Typography color='text.primary' variant='body1' sx={{ pb: 1 }}>
            Phone: 1-800-000-0000
          </Typography>
          <Typography color='text.primary' variant='body1' sx={{ pb: 1 }}>
            Service Hours: Monday ~ Friday, 7:00AM - 12:30AM PT／10AM - 3:30AM
            ET{' '}
            <Typography
              color='primary'
              sx={{
                display: 'inline-block'
              }}
            >
              (11/24-11/25 Thanksgiving Closed)
            </Typography>
            <Typography variant='h6' sx={{ pt: 5, pb: 2 }}>
              Yami Market Mailing Address
            </Typography>
            <Typography color='text.primary' variant='body1' sx={{ pb: 0.5 }}>
              Yami Market Customer Service
            </Typography>
            <Typography color='text.primary' variant='body1' sx={{ pb: 0.5 }}>
              70 Washington Square S
            </Typography>
            <Typography color='text.primary' variant='body1' sx={{ pb: 0.5 }}>
              New York, NY 10012
            </Typography>
            <Typography variant='h6' sx={{ pt: 5, pb: 2 }}>
              Yami Market Address
            </Typography>
            <iframe
              title='Yami Market Address'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4813874645324!2d-74.00170586501382!3d40.72943187837982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599051b30887%3A0x6028dd2df0a0e9a2!2sElmer%20Holmes%20Bobst%20Library!5e0!3m2!1szh-CN!2sus!4v1670853914147!5m2!1szh-CN!2sus'
              width='800'
              height='500'
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Contact;

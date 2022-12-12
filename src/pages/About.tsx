import { Box, Typography } from '@mui/material';

import Helmet from '../components/Helmet/Helmet';

const About = () => {
  return (
    <>
      <Helmet title='About Us' />
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
            About Us
          </Typography>
          <Typography color='text.primary' variant='body1'>
            <Typography sx={{ pt: 5, pb: 2 }}>
              Established in March 2013, Yami (formerly Yamibuy) is the leading
              Asian American-Centric Internet Company, dedicated to providing
              Asian snacks & food, beauty & health products, home appliances and
              books to Asian Americans. With rapid growth, Yami is now the most
              popular one-stop shopping destination among the Chinese community
              in North America.
            </Typography>
            <Typography sx={{ py: 2 }}>
              Headquartered in the Brea, California, Yami operates independently
              out of a 450,000 square feet warehouse with its home grown
              automated logistic system. Carrying thousands of products, Yami
              aims to offer the most complete selection of products favorited by
              the Asian community. We rapidly develop partnerships with
              marketplace vendors to bring forth wider collection of products in
              snacks, soft drinks, instant foods, seasonings, dried foods,
              cosmetics, skin care products, health supplements, eastern and
              western herbal supplements, nutriments, baby products,
              kitchenware, and home appliances. In addition to the thousands of
              well-known and respected brands such as KOSE, SHISEIDO, LOTTE,
              Want Want, and Master Kong, we are continuously building stronger
              partnerships to strengthen not only our own but also our partners’
              brand name in North America.
            </Typography>
            <Typography sx={{ py: 2 }}>
              Yami currently has over 2,000,000 registered and has built a loyal
              fan base in each state in the United States. One out of ten Asian
              Americans chooses us as their No.1 online shopping destination.
              Furthermore, our registered users are increasing in a tremendous
              pace over the years and we diligently provide them with
              exceptional services. At the same time, we continue to invest and
              enhance our platform with numerous value added services to stay
              ahead of the competition.
            </Typography>
            <Typography sx={{ py: 2 }}>
              Yami was founded by Alex Zhou. While studying in Kansas, he
              experienced the inconvenience of driving two hours to reach the
              closest Asian market. Thus, led to the making of Yami as he set
              out to help Asian Americans in the states that are facing the same
              difficult situations. Yami targets to provide the most complete
              and up-to-date selection of Asian products alongside with the best
              online shopping experience and outstanding customer service. We
              hope to provide Asian Americans homelike feel living in North
              America and allow Asian culture and traditions to be preserved and
              spread in this foreign land.
            </Typography>
            <Typography sx={{ py: 2 }}>
              Yami conveniently serves the Asian community with an exceptional
              online shopping experience and strives to continuously expand all
              over North America.
            </Typography>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default About;

import { useQueries } from '@tanstack/react-query';
import Carousel from 'react-material-ui-carousel';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  getBestProductQuery,
  getFastProductQuery,
  getLimitedProductQuery
} from '../api/specialProductApi';
import Loading from '../components/Backdrop/Loading';
import ProductCard from '../components/Card/ProductCard';
import HorizontalScrollingMenu from '../components/Carousel/HorizontalScrollingMenu';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import HomePostImage from '../components/Image/HomePostImage';
import '../css/horizontalScrollingMenu.css';

const Home = () => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));
  const [bestProductQuery, fastProductQuery, limitedProductQuery] = useQueries({
    queries: [
      getBestProductQuery(),
      getFastProductQuery(),
      getLimitedProductQuery()
    ]
  });

  if (
    bestProductQuery.isLoading ||
    limitedProductQuery.isLoading ||
    fastProductQuery.isLoading
  ) {
    return <Loading />;
  }

  const bestProductList = bestProductQuery.isSuccess
    ? bestProductQuery.data
    : [];
  const fastProductList = fastProductQuery.isSuccess
    ? fastProductQuery.data
    : [];
  const limitedProductList = limitedProductQuery.isSuccess
    ? limitedProductQuery.data
    : [];

  return (
    <>
      <Helmet title='Home' />

      <Carousel
        height={mdMatch ? 500 : 250}
        navButtonsAlwaysInvisible
        interval={3000}
      >
        <HomePostImage src='images/post-1.jpg' alt='post-1' />
        <HomePostImage src='images/post-2.jpg' alt='post-2' />
        <HomePostImage src='images/post-3.jpg' alt='post-3' />
      </Carousel>

      <BlackDivider sx={{ my: 3 }} />

      <Box
        sx={{ width: '100%', maxWidth: '1920px', margin: 'auto', px: 3, my: 6 }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, pt: 1 }}>
          Best Sellers
        </Typography>
        <HorizontalScrollingMenu mdMatch={mdMatch}>
          {bestProductList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalScrollingMenu>
      </Box>

      <BlackDivider sx={{ my: 3 }} />

      <Box
        sx={{ width: '100%', maxWidth: '1920px', margin: 'auto', px: 3, my: 6 }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, pt: 1 }}>
          Limited Edition
        </Typography>
        <HorizontalScrollingMenu mdMatch={mdMatch}>
          {limitedProductList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalScrollingMenu>
      </Box>

      <BlackDivider sx={{ my: 3 }} />

      <Box
        sx={{ width: '100%', maxWidth: '1920px', margin: 'auto', px: 3, my: 6 }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, pt: 1 }}>
          Selling Fast
        </Typography>
        <HorizontalScrollingMenu mdMatch={mdMatch}>
          {fastProductList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalScrollingMenu>
      </Box>
    </>
  );
};

export default Home;

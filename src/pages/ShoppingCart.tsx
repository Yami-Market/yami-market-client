import { useQuery } from '@tanstack/react-query';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getRecommendedProductQuery } from '../api/specialProductApi';
import Loading from '../components/Backdrop/Loading';
import ProductCard from '../components/Card/ProductCard';
import HorizontalScrollingMenu from '../components/Carousel/HorizontalScrollingMenu';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import CartOrderSummary from '../containers/Cart/CartOrderSummary';
import CartProductList from '../containers/Cart/CartProductList';
import CartSaveForLater from '../containers/Cart/CartSaveForLater';
import { useAppSelector } from '../hooks/useRedux';

const ShoppingCart = () => {
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));

  const shoppingCart = useAppSelector(state => state.shoppingCart);
  const recommendedProductQuery = useQuery(getRecommendedProductQuery());

  if (recommendedProductQuery.isLoading) {
    return <Loading />;
  }

  const recommendedProductList = recommendedProductQuery.isSuccess
    ? recommendedProductQuery.data
    : [];

  return (
    <>
      <Helmet title='Shopping Cart' />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: 'auto',
          my: 6,
          px: 3
        }}
      >
        {shoppingCart.length === 0 ? (
          <Box>
            <Typography
              color='primary'
              variant='h4'
              sx={{
                fontWeight: 500,
                textAlign: 'center',
                pt: 10,
                pb: 2
              }}
            >
              Your cart is empty
            </Typography>
            <Typography
              color='text.primary'
              variant='body1'
              sx={{ textAlign: 'center', pb: 10 }}
            >
              Fill up your ShoppingCart by the awesome things you can buy on
              Yami Market!&nbsp;&nbsp;
              <Link
                component={RouterLink}
                to='/'
                color='inherit'
                sx={theme => ({
                  color: theme.palette.text.primary,
                  '&:hover': {
                    color: theme.palette.primary.main
                  }
                })}
              >
                View our products
              </Link>
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ pl: 2, pb: 3 }}>
              <Typography
                color='primary'
                variant='h4'
                sx={{
                  display: 'inline-block',
                  fontWeight: 500,
                  mr: 2
                }}
              >
                Shopping Cart
              </Typography>
              <Typography
                color='text.secondary'
                variant='body2'
                sx={{
                  display: 'inline-block'
                }}
              >
                Items in your bag are not on hold.
              </Typography>
            </Box>
            <Stack direction='row'>
              <CartProductList shoppingCart={shoppingCart} />
              <CartOrderSummary />
            </Stack>
          </>
        )}
      </Box>

      <BlackDivider sx={{ my: 3 }} />

      <CartSaveForLater />

      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: 'auto',
          px: 3,
          my: 6
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 500, pt: 1 }}>
          Recommended for you
        </Typography>
        <HorizontalScrollingMenu mdMatch={mdMatch}>
          {recommendedProductList.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalScrollingMenu>
      </Box>
    </>
  );
};

export default ShoppingCart;

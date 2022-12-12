import { Box, Stack } from '@mui/material';

import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import CheckoutOrderSummary from '../containers/Checkout/CheckoutOrderSummary';
import PaymentMethodPanel from '../containers/Checkout/PaymentMethod/PaymentMethodPanel';
import ReviewItemAndShippingPanel from '../containers/Checkout/ReviewItemAndShipping/ReviewItemAndShippingPanel';
import ShippingAddressPanel from '../containers/Checkout/ShippingAddress/ShippingAddressPanel';
import { CheckoutProvider } from '../providers/CheckoutProvider';

const Checkout = () => {
  return (
    <>
      <Helmet title='Checkout' />
      <CheckoutProvider>
        <Box
          sx={{
            width: '100%',
            maxWidth: '1000px',
            margin: 'auto',
            my: 6
          }}
        >
          <Stack direction='row' sx={{ pl: 2, pb: 3 }}>
            <Stack direction='column' sx={{ mx: 5, px: 3, flexGrow: 1 }}>
              <ShippingAddressPanel />
              <BlackDivider sx={{ my: 2 }} />
              <PaymentMethodPanel />
              <BlackDivider sx={{ my: 2 }} />
              <ReviewItemAndShippingPanel />
            </Stack>
            <CheckoutOrderSummary />
          </Stack>
        </Box>
      </CheckoutProvider>
    </>
  );
};

export default Checkout;

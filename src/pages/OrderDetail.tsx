import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import {
  Box,
  Breadcrumbs,
  Divider,
  Link,
  Stack,
  Typography
} from '@mui/material';

import { getOrderQuery } from '../api/orderApi';
import Loading from '../components/Backdrop/Loading';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import ContactLink from '../components/Link/ContactLink';
import {
  AmericanExpressIcon,
  MasterCardIcon,
  VisaIcon
} from '../icons/PaymentIcon';
import { AngleRightIcon } from '../icons/UIIcon';
import {
  formatPhoneNumber,
  formatPrice,
  formatTimestamp
} from '../utils/string';

const OrderDetail = () => {
  const { orderId } = useParams();
  const orderQuery = useQuery(getOrderQuery(orderId));

  if (orderQuery.isLoading) {
    return <Loading />;
  }

  if (!orderQuery.data) {
    return null;
  }

  const creditCardTypeIcon = (type: string) => {
    switch (type) {
      case 'Visa':
        return <VisaIcon sx={{ fontSize: 60 }} />;
      case 'Mastercard':
        return <MasterCardIcon sx={{ fontSize: 60 }} />;
      case 'American Express':
        return <AmericanExpressIcon sx={{ fontSize: 60 }} />;
    }
  };

  const order = orderQuery.data;

  console.log(orderId);
  return (
    <>
      <Helmet title='Order Detail' />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: 'auto',
          my: 3,
          px: 3
        }}
      >
        <Box sx={{ pl: 2, pb: 2 }}>
          <Breadcrumbs separator={<AngleRightIcon fontSize={16} />}>
            <Link
              component={RouterLink}
              to='/order'
              underline='hover'
              color='inherit'
            >
              Order
            </Link>
            <Link
              component={RouterLink}
              to={`/order/${order.id}`}
              underline='hover'
              color='inherit'
            >
              Order #: {order.id}
            </Link>
          </Breadcrumbs>
        </Box>
        <Box sx={{ pl: 2, pb: 2 }}>
          <Typography
            color='primary'
            variant='h4'
            sx={{
              display: 'inline-block',
              fontWeight: 500,
              mr: 2
            }}
          >
            Order Detail
          </Typography>
        </Box>
        <Box sx={{ pl: 3, pb: 3 }}>
          <Typography
            color='text.secondary'
            variant='body1'
            sx={{
              display: 'inline-block',
              pr: 3
            }}
          >
            Order #: {order.id.toUpperCase()}
          </Typography>
          <Typography
            color='text.secondary'
            variant='body1'
            sx={{
              display: 'inline-block'
            }}
          >
            {formatTimestamp(order.order_date)}
          </Typography>
        </Box>
        <Stack direction='row'>
          <Stack direction='column' sx={{ pl: 3, mr: 5, flexGrow: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 500, pb: 3 }}>
              {order.ship_date ? 'Shipped' : 'Processing'}
            </Typography>

            <Typography variant='body1' color='text.secondary'>
              Delivery
            </Typography>

            <Typography
              variant='body1'
              color='text.primary'
              sx={{ mt: 1, mb: 2, fontWeight: 500 }}
            >
              {order.shipping_fee === 0 ? 'Standard' : 'Express'} Shipping
            </Typography>

            <Typography variant='body1' color='text.secondary' sx={{ mb: 1 }}>
              Tracking
            </Typography>

            <Typography variant='body1' color='text.primary' sx={{ mb: 1 }}>
              ID #:{' '}
              {order.ship_date !== null ? (
                <Link
                  target='_blank'
                  href='https://www.ups.com/us/en/Home.page'
                  color='inherit'
                  underline='always'
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {Math.floor(Math.random() * 10000000000000)}
                </Link>
              ) : (
                'None'
              )}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant='body1' color='text.secondary'>
              Shipping Address
            </Typography>
            <Typography variant='body1' sx={{ pt: 1 }}>
              {`${order.shipping_address.first_name} ${order.shipping_address.last_name}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${order.shipping_address.street_address} ${order.shipping_address.optional_address}`}
            </Typography>
            <Typography variant='body1' sx={{ py: 0.2 }}>
              {`${order.shipping_address.city}, ${order.shipping_address.state}
                ${order.shipping_address.zip_code} ${order.shipping_address.country}`}
            </Typography>
            <Typography variant='body1'>
              {' '}
              {formatPhoneNumber(order.shipping_address.phone_number)}
            </Typography>

            <BlackDivider sx={{ my: 4 }} />

            <Typography variant='h5' sx={{ fontWeight: 500, pb: 2 }}>
              Products
            </Typography>
            <Stack direction='column' divider={<Divider />}>
              {order.products.map(product => (
                <Stack direction='row' sx={{ py: 2, alignItems: 'center' }}>
                  <Stack
                    sx={{ width: '100px', height: '120px', minWidth: '100px' }}
                  >
                    <Box
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      sx={{ display: 'flex', width: '100%', height: '100%' }}
                    >
                      <img
                        draggable={false}
                        src={product.image_url}
                        alt='alt'
                        style={{
                          objectFit: 'cover',
                          borderRadius: '6px',
                          width: '80%',
                          height: '80%',
                          margin: 'auto'
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    sx={{
                      maxWidth: '250px',
                      height: '100%',
                      justifyContent: 'space-evenly',
                      flexGrow: 1,
                      pl: 2,
                      pt: 2
                    }}
                  >
                    <Typography
                      component={RouterLink}
                      to={`/product/${product.id}`}
                      color='text.primary'
                      variant='body1'
                      sx={{ fontWeight: 500, textDecoration: 'none' }}
                    >
                      {product.name}
                    </Typography>
                  </Stack>

                  <Stack sx={{ flexGrow: 1, alignItems: 'flex-end', pr: 2 }}>
                    <Typography
                      variant='body1'
                      color='primary'
                      sx={{
                        fontWeight: 500,
                        minWidth: '100px',
                        textAlign: 'right'
                      }}
                    >
                      x {product.order_quantity}
                    </Typography>
                  </Stack>

                  <Stack sx={{ flexGrow: 1, alignItems: 'flex-end', pr: 2 }}>
                    <Typography
                      variant='body1'
                      color='primary'
                      sx={{
                        fontWeight: 500,
                        minWidth: '100px',
                        textAlign: 'right'
                      }}
                    >
                      {formatPrice(product.unit_price)}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack
            direction='column'
            sx={{
              width: '360px',
              minWidth: '360px',

              px: 2,
              position: 'sticky',
              height: '100%',
              top: '100px'
            }}
          >
            <Typography variant='body1' fontSize={18} sx={{ pb: 2 }}>
              Need Help?
            </Typography>
            <ContactLink sx={{ px: 0, textDecoration: 'underline' }} />
            <Divider sx={{ my: 3 }} />
            <Typography variant='body1' fontSize={18} sx={{ pb: 2 }}>
              Payment Card
            </Typography>
            <Box
              sx={theme => ({
                px: 3,
                pt: 2,
                pb: 3,
                mb: 2,
                width: '100%',
                backgroundColor: theme.palette.action.hover,
                borderRadius: 1
              })}
            >
              <Stack direction='row' sx={{ alignItems: 'center' }}>
                <Typography variant='body1' sx={{ py: 1, flexGrow: 1 }}>
                  {order.credit_card.card_holder_name}
                </Typography>
              </Stack>
              <Typography variant='h6' sx={{ pt: 2 }}>
                {`•••• •••• •••• •••• ${order.credit_card.card_number.slice(
                  -4
                )}`}
              </Typography>
              <Stack direction='row' sx={{ alignItems: 'center' }}>
                <Typography variant='body1' sx={{ flexGrow: 1 }}>
                  {`Expires ${order.credit_card?.card_expiry_month}/${order.credit_card?.card_expiry_year}`}
                </Typography>
                {creditCardTypeIcon(order.credit_card.card_type)}
              </Stack>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography variant='body1' fontSize={18} sx={{ pb: 2 }}>
              Order Summary
            </Typography>
            <Stack direction='row' sx={{ width: '100%', mb: 2 }}>
              <Typography
                variant='body1'
                color='text.primary'
                sx={{ flexGrow: 1 }}
              >
                Subtotal
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {formatPrice(order.subtotal_price)}
              </Typography>
            </Stack>
            <Stack direction='row' sx={{ width: '100%', mb: 2 }}>
              <Typography
                variant='body1'
                color='text.primary'
                sx={{ flexGrow: 1 }}
              >
                Shipping
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {formatPrice(order.shipping_fee)}
              </Typography>
            </Stack>
            <Stack direction='row' sx={{ width: '100%', mb: 2 }}>
              <Typography
                variant='body1'
                color='text.primary'
                sx={{ flexGrow: 1 }}
              >
                Tax
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {formatPrice(order.subtotal_price * order.tax_rate)}
              </Typography>
            </Stack>
            <Stack direction='row' sx={{ width: '100%', mb: 2 }}>
              <Typography
                variant='body1'
                color='text.primary'
                sx={{ flexGrow: 1 }}
              >
                Tax
              </Typography>
              <Typography variant='body1' color='text.primary'>
                {formatPrice(
                  order.subtotal_price * (1 + order.tax_rate) +
                    order.shipping_fee
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default OrderDetail;

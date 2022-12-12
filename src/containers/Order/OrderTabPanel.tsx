import { Link as RouterLink } from 'react-router-dom';

import { Box, Divider, Link, Stack, Typography } from '@mui/material';

import { Order } from '../../api/orderApi';
import { formatPrice, formatTimestamp } from '../../utils/string';

export type OrderTabPanelProps = {
  orderList: Order[];

  index: number;
  value: number;
};

const MAX_PRODUCT_SHOW = 5;

const OrderTabPanel = ({ orderList, value, index }: OrderTabPanelProps) => {
  return (
    <Box hidden={value !== index}>
      {value === index ? (
        orderList.map(order => (
          <Stack
            key={order.id}
            sx={theme => ({
              width: '100%',
              m: 3,

              backgroundColor: theme.palette.action.hover,
              borderRadius: 1
            })}
          >
            <Stack
              direction='row'
              sx={{
                alignItems: 'center',
                px: 3,
                pt: 2
              }}
            >
              <Typography variant='h6'>
                Order #: {order.id.toUpperCase()}
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  pr: 3,
                  marginLeft: 'auto'
                }}
              >
                Date: {formatTimestamp(order.order_date)}
              </Typography>
            </Stack>
            <Divider sx={{ py: 1 }} />
            <Stack
              direction='row'
              sx={{
                alignItems: 'center'
              }}
            >
              <Stack
                direction='row'
                flexWrap='wrap'
                minWidth='360px'
                sx={{
                  px: 3,
                  py: 2,
                  flexGrow: 1,
                  maxWidth: '1000px'
                }}
              >
                {order.products.slice(0, MAX_PRODUCT_SHOW).map(product => (
                  <Box
                    key={product.id}
                    component={RouterLink}
                    to={`/product/#`}
                    sx={{
                      margin: '10px',
                      width: '100px',
                      height: '100px'
                    }}
                  >
                    <img
                      src={product.image_url}
                      alt='alt'
                      draggable={false}
                      style={{
                        borderRadius: '6px',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </Box>
                ))}
                {order.products.length - MAX_PRODUCT_SHOW > 0 ? (
                  <Box
                    sx={theme => ({
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      margin: '10px',
                      borderRadius: '6px',
                      width: '100px',
                      height: '100px',
                      backgroundColor: theme.palette.action.hover
                    })}
                  >
                    <Typography variant='body1' sx={{ textAlign: 'center' }}>
                      + {order.products.length - MAX_PRODUCT_SHOW} more
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </Stack>
              <Box sx={{ px: 5 }}>
                <Typography
                  variant='body1'
                  fontSize={18}
                  sx={{ pb: 1, minWidth: '80px' }}
                >
                  {formatPrice(
                    order.subtotal_price * (1 + order.tax_rate) +
                      order.shipping_fee
                  )}
                </Typography>
                <Typography
                  variant='body1'
                  fontSize={18}
                  sx={{ minWidth: '80px' }}
                >
                  {order.products.length} Items
                </Typography>
              </Box>
              <Divider orientation='vertical' />
              <Box sx={{ px: 5, textAlign: 'center' }}>
                <Typography
                  variant='body1'
                  fontSize={18}
                  sx={{ minWidth: '100px' }}
                >
                  {order.ship_date ? 'Shipped' : 'Processing'}
                </Typography>
              </Box>
              <Divider orientation='vertical' />
              <Box sx={{ px: 5 }}>
                <Link
                  component={RouterLink}
                  to={`/order/${order.id}`}
                  color='inherit'
                  underline='always'
                  sx={{
                    minWidth: '120px',
                    display: 'block',
                    pb: 1.5,
                    color: 'text.primary',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  Order Details
                </Link>
                {order.ship_date !== null ? (
                  <Link
                    target='_blank'
                    href='https://www.ups.com/us/en/Home.page'
                    color='inherit'
                    underline='always'
                    sx={{
                      minWidth: '120px',
                      display: 'block',
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    Track Packages
                  </Link>
                ) : (
                  <></>
                )}
              </Box>
            </Stack>
          </Stack>
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

export default OrderTabPanel;

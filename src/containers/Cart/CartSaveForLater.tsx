import { useQuery } from '@tanstack/react-query';
import * as _ from 'lodash';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography
} from '@mui/material';

import {
  SaveForLaterProduct,
  getSaveForLaterQuery
} from '../../api/saveForLaterApi';
import BlackDivider from '../../components/Divider/BlackDivider';
import useAuth from '../../hooks/useAuth';
import useShoppingCart from '../../hooks/useShoppingCart';
import { ShoppingCartAddIcon } from '../../icons/UIIcon';
import { formatPrice } from '../../utils/string';

const CartSaveForLater = () => {
  const { user } = useAuth();
  const saveForLaterQuery = useQuery(getSaveForLaterQuery(!!user.id));
  const shoppingCart = useShoppingCart();
  if (!user.id) {
    return null;
  }

  if (saveForLaterQuery.isLoading) {
    return null;
  }

  const saveForLaterList = saveForLaterQuery.data
    ? _.orderBy(saveForLaterQuery.data, 'created_at', 'asc')
    : [];

  if (saveForLaterList.length === 0) {
    return null;
  }

  const handleAddToCart = (product: SaveForLaterProduct) => () => {
    shoppingCart.add(
      {
        id: product.product_id,
        name: product.name,
        image_url: product.image_url,
        list_price: product.list_price,
        category_id: product.category_id
      },
      1
    );
    shoppingCart.updateSaveForLater(product.product_id);
  };

  const handleRemove = (product: SaveForLaterProduct) => () => {
    shoppingCart.deleteSaveForLater(product.product_id);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          margin: 'auto'
        }}
      >
        <Box sx={{ pl: 2, pb: 3 }}>
          <Typography variant='h5'>Save for later</Typography>
        </Box>
        <Stack direction='row' flexWrap='wrap' sx={{ mx: 9 }}>
          {saveForLaterList.map(saveForLater => (
            <Card
              key={saveForLater.product_id}
              sx={{
                width: '300px',
                maxWidth: {
                  xs: '160px',
                  sm: '180px',
                  md: '250px',
                  xl: '280px'
                },
                mx: { xs: 1, md: 2 },
                my: 2
              }}
            >
              <CardMedia
                component={RouterLink}
                to={`/product/${saveForLater.product_id}`}
                // reloadDocument
                draggable={false}
                image={saveForLater.image_url}
                sx={{ height: { xs: '125px', md: '250px' } }}
              />
              <CardContent sx={{ paddingBottom: '16px !important' }}>
                <Typography
                  component={RouterLink}
                  to={`/product/${saveForLater.product_id}`}
                  // reloadDocument
                  color='text.primary'
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    mb: 1,
                    height: '72px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textDecoration: 'none'
                  }}
                >
                  {saveForLater.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component='div'
                    color='primary'
                    sx={{ fontSize: '18px', fontWeight: 400, flexGrow: 1 }}
                  >
                    {formatPrice(saveForLater.list_price)}
                  </Typography>
                  <IconButton
                    color='primary'
                    onClick={handleAddToCart(saveForLater)}
                  >
                    <ShoppingCartAddIcon size='sm' />
                  </IconButton>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      display: 'inline',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                    onClick={handleRemove(saveForLater)}
                  >
                    Remove
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
      <BlackDivider sx={{ my: 3 }} />
    </>
  );
};

export default CartSaveForLater;

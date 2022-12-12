import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';

import { Product } from '../../api/productApi';
import useShoppingCart from '../../hooks/useShoppingCart';
import { ShoppingCartAddIcon } from '../../icons/UIIcon';
import { formatPrice } from '../../utils/string';

export type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const shoppingCart = useShoppingCart();

  const handleAddToCart = () => {
    shoppingCart.add(product, 1);
  };

  return (
    <Card
      sx={{
        width: '300px',
        maxWidth: { xs: '160px', sm: '180px', md: '250px', xl: '280px' },
        mx: { xs: 1, md: 2 },
        my: 2
      }}
    >
      <CardMedia
        component={RouterLink}
        to={`/product/${product.id}`}
        // reloadDocument
        draggable={false}
        image={product.image_url}
        sx={{ height: { xs: '125px', md: '250px' } }}
      />
      <CardContent sx={{ paddingBottom: '16px !important' }}>
        <Typography
          component={RouterLink}
          to={`/product/${product.id}`}
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
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            component='div'
            color='primary'
            sx={{ fontSize: '18px', fontWeight: 400, flexGrow: 1 }}
          >
            {formatPrice(product.list_price)}
          </Typography>
          <IconButton color='primary' onClick={handleAddToCart}>
            <ShoppingCartAddIcon size='sm' />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

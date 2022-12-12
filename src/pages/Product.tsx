import { useQueries } from '@tanstack/react-query';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link as RouterLink, useParams } from 'react-router-dom';

import {
  Box,
  Breadcrumbs,
  Divider,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getProductQuery } from '../api/productApi';
import { getRecommendedProductQuery } from '../api/specialProductApi';
import Loading from '../components/Backdrop/Loading';
import ProductCard from '../components/Card/ProductCard';
import { CustomDot } from '../components/Carousel/CustomMultiCarousel';
import HorizontalScrollingMenu from '../components/Carousel/HorizontalScrollingMenu';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import AddToCart from '../containers/Product/AddToCart';
import { AngleRightIcon } from '../icons/UIIcon';
import { randomColor, randomParagraph, randomWord } from '../utils/fake';
import { formatPrice } from '../utils/string';

const Product = () => {
  const { productId } = useParams();
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));

  const [productQuery, recommendedProductQuery] = useQueries({
    queries: [getProductQuery(productId), getRecommendedProductQuery()]
  });

  if (productQuery.isLoading || recommendedProductQuery.isLoading) {
    return <Loading />;
  }

  // TODO: Handle error
  // if (productQuery.error) {
  //   throw new Response('', {
  //     status: 404,
  //     statusText: 'Not Found'
  //   });
  // }

  const productData = productQuery.isSuccess ? productQuery.data : null;
  const recommendedProductList = recommendedProductQuery.isSuccess
    ? recommendedProductQuery.data
    : [];

  const imageUrlList = [
    productData?.product_detail.image_url || '#',
    ...(productData?.image_urls || [])
  ];

  return (
    <>
      <Helmet title={productData?.product_detail.name} />
      <Box
        sx={{ width: '100%', maxWidth: '1920px', margin: 'auto', px: 3, my: 3 }}
      >
        <Breadcrumbs separator={<AngleRightIcon fontSize={16} />}>
          <Link
            component={RouterLink}
            to={`/category/${productData?.categories.level_1_id}`}
            underline='hover'
            color='inherit'
          >
            {productData?.categories.level_1_name}
          </Link>
          <Link
            component={RouterLink}
            to={`/category/${productData?.categories.level_2_id}`}
            underline='hover'
            color='inherit'
          >
            {productData?.categories.level_2_name}
          </Link>
          <Link
            component={RouterLink}
            to={`/category/${productData?.categories.level_3_id}`}
            underline='hover'
            color='text.primary'
          >
            {productData?.categories.level_3_name}
          </Link>
        </Breadcrumbs>
        <Stack direction='row' spacing={8} sx={{ mt: 3, px: 1 }}>
          <Box
            sx={{
              minWidth: '700px',
              height: '600px'
            }}
          >
            <Carousel
              responsive={{
                all: { breakpoint: { max: 4000, min: 0 }, items: 1 }
              }}
              infinite
              showDots
              renderDotsOutside
              customDot={<CustomDot imageList={imageUrlList} />}
            >
              {imageUrlList.map(imageUrl => (
                <img
                  key={imageUrl}
                  src={imageUrl}
                  alt='product'
                  draggable='false'
                  style={{
                    objectFit: 'cover',
                    width: '600px',
                    height: '600px'
                  }}
                />
              ))}
            </Carousel>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='h4' sx={{ my: 2 }}>
              {productData?.product_detail.name}
            </Typography>
            <Typography
              variant='h5'
              color='primary'
              sx={{ mb: 1, fontWeight: 500 }}
            >
              {formatPrice(productData?.product_detail.list_price || 0)}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant='body1' sx={{ mb: 1, fontWeight: 500 }}>
                Specifications
              </Typography>
              <Stack>
                <Stack direction='row' sx={{ my: 0.5 }}>
                  <Typography variant='body1' sx={{ width: '50%' }}>
                    Brand
                  </Typography>
                  <Typography
                    color='text.secondary'
                    variant='body1'
                    sx={{ width: '50%' }}
                  >
                    {randomWord().toUpperCase()}
                  </Typography>
                </Stack>
                <Stack direction='row' sx={{ my: 0.5 }}>
                  <Typography variant='body1' sx={{ width: '50%' }}>
                    Material
                  </Typography>
                  <Typography
                    color='text.secondary'
                    variant='body1'
                    sx={{ width: '50%' }}
                  >
                    {randomWord()}
                  </Typography>
                </Stack>
                <Stack direction='row' sx={{ my: 0.5 }}>
                  <Typography variant='body1' sx={{ width: '50%' }}>
                    Color
                  </Typography>
                  <Typography
                    color='text.secondary'
                    variant='body1'
                    sx={{ width: '50%' }}
                  >
                    {randomColor()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant='body1' sx={{ mb: 1, fontWeight: 500 }}>
                About this item
              </Typography>
              <ul>
                <li>
                  <Typography variant='body1'>{randomParagraph()}</Typography>
                </li>
                <li>
                  <Typography variant='body1'>{randomParagraph()}</Typography>
                </li>
                <li>
                  <Typography variant='body1'>{randomParagraph()}</Typography>
                </li>
                <li>
                  <Typography variant='body1'>{randomParagraph()}</Typography>
                </li>
                <li>
                  <Typography variant='body1'>{randomParagraph()}</Typography>
                </li>
              </ul>
            </Box>
            <Divider sx={{ my: 3 }} />
            {productData?.product_detail.id && (
              <AddToCart product={productData.product_detail} />
            )}
          </Box>
        </Stack>
      </Box>

      <BlackDivider sx={{ mt: 6, mb: 3 }} />

      <Box
        sx={{
          width: '100%',
          maxWidth: '1920px',
          margin: 'auto',
          px: 3,
          my: 3
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

export default Product;

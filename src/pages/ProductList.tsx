import { useQuery } from '@tanstack/react-query';
import {
  Link as RouterLink,
  useParams,
  useSearchParams
} from 'react-router-dom';

import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Pagination,
  PaginationItem,
  Stack,
  Typography
} from '@mui/material';

import { getAllProductByCategoryIdQuery } from '../api/categoryApi';
import Loading from '../components/Backdrop/Loading';
import ProductCard from '../components/Card/ProductCard';
import BlackDivider from '../components/Divider/BlackDivider';
import Helmet from '../components/Helmet/Helmet';
import { handleCategoryPath } from '../helpers/categoryHelper';
import { AngleLeftIcon, AngleRightIcon } from '../icons/UIIcon';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const { categoryId } = useParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const productPaginationQuery = useQuery(
    getAllProductByCategoryIdQuery(categoryId || '', page)
  );

  if (productPaginationQuery.isLoading) {
    return <Loading />;
  }

  const productPagination = productPaginationQuery.data;

  // TODO: Not Found
  if (!productPagination) {
    return null;
  }

  console.log(productPagination.total);
  const categoryPath = handleCategoryPath(productPagination.category_path);

  return (
    <>
      <Helmet title={productPagination.category_name} />
      <Box
        sx={{ width: '100%', maxWidth: '1440px', margin: 'auto', px: 5, py: 3 }}
      >
        <Breadcrumbs separator={<AngleRightIcon fontSize={16} />}>
          {categoryPath.path.map(category => (
            <Link
              key={category.pathId}
              component={RouterLink}
              to={`/category/${category.pathId}`}
              underline='hover'
              color='inherit'
            >
              {category.pathName}
            </Link>
          ))}
          <Box></Box>
        </Breadcrumbs>
        <Stack direction='row' sx={{ mt: 2, mb: 4 }}>
          <Typography variant='h4' color='primary' sx={{ flexGrow: 1 }}>
            {categoryPath.title}
          </Typography>
          <Typography variant='h5' color='text.secondary'>
            {productPagination.total} items
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {productPagination.products.map(product => (
            <Grid item xs={6} sm={4} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <BlackDivider sx={{ my: 2 }} />
      <Stack direction='row' sx={{ justifyContent: 'center', my: 3 }}>
        <Pagination
          renderItem={item => (
            <PaginationItem
              component={RouterLink}
              to={`/category/${categoryId}${
                item.page === 1 ? '' : `?page=${item.page}`
              }`}
              slots={{ previous: AngleLeftIcon, next: AngleRightIcon }}
              {...item}
            />
          )}
          color='primary'
          count={Math.ceil(productPagination.total / 24)}
          page={page}
          sx={{
            '& .MuiPaginationItem-icon': {
              fontSize: '18px'
            }
          }}
        />
      </Stack>
    </>
  );
};

export default ProductList;

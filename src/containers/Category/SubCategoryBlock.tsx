import { Link as RouterLink } from 'react-router-dom';

import { Box, Link } from '@mui/material';

import { CategoryObject } from '../../helpers/categoryHelper';

export type SubCategoryBlockProps = {
  subCategory: CategoryObject;
  handlePopoverClose?: () => void;
};

const SubCategoryBlock = ({
  subCategory,
  handlePopoverClose
}: SubCategoryBlockProps) => {
  return (
    <Box sx={{ p: 1, ml: 2, textAlign: 'start' }}>
      <Link
        component={RouterLink}
        to={`/category/${subCategory.id}`}
        color='text.primary'
        underline='hover'
        sx={theme => ({
          display: 'block',
          fontWeight: 500,
          mb: 1,
          cursor: 'pointer',
          '&:hover': {
            color: theme.palette.primary.main
          }
        })}
        onClick={handlePopoverClose}
      >
        {subCategory.name}
      </Link>

      {subCategory.children.map(subSubCategory => (
        <Link
          component={RouterLink}
          to={`/category/${subSubCategory.id}`}
          key={subSubCategory.id}
          color='text.primary'
          underline='hover'
          sx={theme => ({
            display: 'block',
            mb: 1,
            cursor: 'pointer',
            '&:hover': {
              color: theme.palette.primary.main
            }
          })}
          onClick={handlePopoverClose}
        >
          {subSubCategory.name}
        </Link>
      ))}
    </Box>
  );
};

export default SubCategoryBlock;

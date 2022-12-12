import { Link as RouterLink } from 'react-router-dom';

import { Grid, Link } from '@mui/material';

import { CATEGORY_POPOVER_HEIGHT } from '../../constant/layout';
import { CategoryObject } from '../../helpers/categoryHelper';
import SubCategoryBlock from './SubCategoryBlock';

export type CategoryTabPanelProps = {
  mdMatch: boolean;
  categoryObject: CategoryObject | undefined;
  handlePopoverClose?: () => void;
};

const CategoryTabPanel = ({
  mdMatch,
  categoryObject,
  handlePopoverClose
}: CategoryTabPanelProps) => {
  if (!categoryObject) {
    return null;
  }

  return (
    <Grid
      container
      direction='column'
      sx={{
        height: '100%',
        maxHeight: { md: `${CATEGORY_POPOVER_HEIGHT}px` },
        py: 2
      }}
    >
      {!mdMatch ? (
        <Link
          color='text.primary'
          component={RouterLink}
          underline='none'
          to={`/category/${categoryObject.id}`}
          sx={{
            fontWeight: 500,
            p: 1,
            ml: 2
          }}
        >
          All
        </Link>
      ) : (
        <></>
      )}
      {categoryObject.children.map(subCategory => (
        <SubCategoryBlock
          key={subCategory.id}
          subCategory={subCategory}
          handlePopoverClose={handlePopoverClose}
        />
      ))}
    </Grid>
  );
};

export default CategoryTabPanel;

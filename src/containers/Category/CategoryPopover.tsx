import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { Box, Popover, Typography } from '@mui/material';

import { getCategoryQuery } from '../../api/categoryApi';
import { CATEGORY_POPOVER_HEIGHT } from '../../constant/layout';
import { getCategoryCollection } from '../../helpers/categoryHelper';
import useNavbar from '../../hooks/useNavbar';
import useThemeMode from '../../hooks/useThemeMode';
import { AngleUpIcon, MenuIcon } from '../../icons/UIIcon';
import CategoryTabs from './CategoryTabs';

const CategoryPopover = () => {
  const { resolvedTheme } = useThemeMode();

  const { categoryAnchorEl, setCategoryPopoverClose, setCategoryPopoverOpen } =
    useNavbar();
  const open = Boolean(categoryAnchorEl);

  const categoryQuery = useQuery(getCategoryQuery());

  if (categoryQuery.isLoading) {
    return null;
  }

  const categoryList = categoryQuery.data ? categoryQuery.data : [];
  const categoryCollection = getCategoryCollection(categoryList);

  if (!categoryCollection) {
    return null;
  }

  // console.log(categoryCollection);

  return (
    <>
      <Box
        onMouseEnter={setCategoryPopoverOpen}
        sx={theme => ({
          alignItems: 'center',
          display: { xs: 'none', md: 'flex' },
          mx: 1,
          color: open ? theme.palette.primary.main : theme.palette.text.primary
        })}
      >
        <Box sx={{ width: '15px', display: 'flex', alignItems: 'center' }}>
          {open ? <AngleUpIcon fontSize={20} /> : <MenuIcon fontSize={18} />}
        </Box>
        <Typography
          sx={{
            mx: 1
          }}
        >
          Category
        </Typography>
      </Box>
      <Popover
        open={open}
        anchorEl={categoryAnchorEl}
        anchorReference='anchorPosition'
        anchorPosition={{ top: 65, left: 0 }}
        elevation={1}
        transitionDuration={0}
        onClose={setCategoryPopoverClose}
        sx={{
          '&.MuiPopover-root': {
            top: '65px !important'
          }
        }}
        PaperProps={{
          square: true,
          sx: theme => ({
            borderTop:
              resolvedTheme === 'dark'
                ? `1px solid ${theme.palette.text.primary}`
                : 0,
            position: 'fixed',
            top: '65px !important',
            width: '100vw',
            // maxWidth: '1920px',
            height: `calc(100vh - 65px)`,
            maxHeight: { md: `${CATEGORY_POPOVER_HEIGHT}px` },
            left: '50% !important',
            transform: 'translate(-50%) !important'
          })
        }}
        slotProps={{
          backdrop: {
            // @ts-ignore
            invisible: false,
            transitionDuration: 0,
            sx: { top: '65px !important' }
          }
        }}
      >
        <CategoryTabs categoryCollection={categoryCollection} />
      </Popover>
    </>
  );
};

export default CategoryPopover;

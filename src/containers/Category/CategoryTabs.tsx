import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { CategoryObject } from '../../helpers/categoryHelper';
import useNavbar from '../../hooks/useNavbar';
import {
  FurnitureIcon,
  OfficeSuppliesIcon,
  TechnologyIcon
} from '../../icons/CategoryIcon';
import CategoryTabIcon from '../../icons/CategoryTabIcon';
import CategoryTabPanel from './CategoryTabPanel';

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <Box
      id='category-tab-panel-container'
      sx={{ height: '100%' }}
      hidden={value !== index}
    >
      {children}
    </Box>
  );
};

export type CategoryTabsProps = {
  categoryCollection: CategoryObject[];
};

const CategoryTabs = ({ categoryCollection }: CategoryTabsProps) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up('md'));
  const { setCategoryPopoverClose } = useNavbar();

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (mdMatch) {
      const index = parseInt(event.currentTarget.id, 10);
      setValue(index);
    }
  };

  const onChange = (event: React.SyntheticEvent, newValue: number) => {
    if (!mdMatch) {
      setValue(newValue);
    }
  };

  return (
    <Box
      id='category-tabs-container'
      sx={{
        height: '100%',
        flexGrow: 1,
        display: 'flex'
      }}
      onMouseLeave={setCategoryPopoverClose}
    >
      <Tabs
        orientation='vertical'
        value={value}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          position: 'sticky',
          height: '500px',
          top: '56px'
        }}
        onChange={onChange}
      >
        <Tab
          id='0'
          component={mdMatch ? RouterLink : 'div'}
          to={`/category/${
            categoryCollection.find(item => item.name === 'Furniture')?.id
          }`}
          icon={
            <CategoryTabIcon value={value} index={0} SvgIcon={FurnitureIcon} />
          }
          label='Furniture'
          sx={{ color: 'text.primary', mb: 2 }}
          onMouseEnter={handleMouseEnter}
          onClick={setCategoryPopoverClose}
        />
        <Tab
          id='1'
          component={mdMatch ? RouterLink : 'div'}
          to={`/category/${
            categoryCollection.find(item => item.name === 'Office Supplies')?.id
          }`}
          icon={
            <CategoryTabIcon
              value={value}
              index={1}
              SvgIcon={OfficeSuppliesIcon}
            />
          }
          label='Office Supplies'
          sx={{ color: 'text.primary', mb: 2 }}
          onMouseEnter={handleMouseEnter}
          onClick={setCategoryPopoverClose}
        />
        <Tab
          id='2'
          component={mdMatch ? RouterLink : 'div'}
          to={`/category/${
            categoryCollection.find(item => item.name === 'Technology')?.id
          }`}
          icon={
            <CategoryTabIcon value={value} index={2} SvgIcon={TechnologyIcon} />
          }
          label='Technology'
          sx={{ color: 'text.primary' }}
          onMouseEnter={handleMouseEnter}
          onClick={setCategoryPopoverClose}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CategoryTabPanel
          mdMatch={mdMatch}
          categoryObject={categoryCollection.find(i => i.name === 'Furniture')}
          handlePopoverClose={setCategoryPopoverClose}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CategoryTabPanel
          mdMatch={mdMatch}
          categoryObject={categoryCollection.find(
            i => i.name === 'Office Supplies'
          )}
          handlePopoverClose={setCategoryPopoverClose}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CategoryTabPanel
          mdMatch={mdMatch}
          categoryObject={categoryCollection.find(i => i.name === 'Technology')}
          handlePopoverClose={setCategoryPopoverClose}
        />
      </TabPanel>
    </Box>
  );
};

export default CategoryTabs;

import React from 'react';

import { CategorySvgIconProps } from './CategoryIcon';

export type Props = {
  value: number;
  index: number;
  SvgIcon: React.FunctionComponent<CategorySvgIconProps>;
};

const CategoryTabIcon = ({ value, index, SvgIcon }: Props) => {
  return (
    <SvgIcon
      sx={theme => ({
        fontSize: '48px',
        '& g': {
          fill:
            value === index
              ? theme.palette.primary.main
              : theme.palette.text.primary
        }
      })}
    />
  );
};

export default CategoryTabIcon;

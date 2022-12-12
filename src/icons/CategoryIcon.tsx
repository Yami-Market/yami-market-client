import { SxProps, Theme } from '@mui/material/styles';

import SvgIconBase from './SvgIconBase';
import { ReactComponent as FurnitureIconSvg } from './assets/furniture.svg';
import { ReactComponent as OfficeSuppliesIconSvg } from './assets/office-supplies.svg';
import { ReactComponent as TechnologyIconSvg } from './assets/technology.svg';

export type CategorySvgIconProps = {
  inheritViewBox?: boolean;
  sx?: SxProps<Theme>;
};

export const FurnitureIcon = (props: CategorySvgIconProps) => {
  const { inheritViewBox, sx } = props;
  return (
    <SvgIconBase
      component={FurnitureIconSvg}
      inheritViewBox={inheritViewBox}
      sx={sx}
    />
  );
};

export const OfficeSuppliesIcon = (props: CategorySvgIconProps) => {
  const { inheritViewBox, sx } = props;
  return (
    <SvgIconBase
      component={OfficeSuppliesIconSvg}
      inheritViewBox={inheritViewBox}
      sx={sx}
    />
  );
};

export const TechnologyIcon = (props: CategorySvgIconProps) => {
  const { inheritViewBox, sx } = props;
  return (
    <SvgIconBase
      component={TechnologyIconSvg}
      inheritViewBox={inheritViewBox}
      sx={sx}
    />
  );
};

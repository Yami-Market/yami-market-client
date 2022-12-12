import { SxProps, Theme } from '@mui/material/styles';

import SvgIconBase from './SvgIconBase';
import { ReactComponent as LogoIconSvg } from './assets/logo.svg';

export type LogoSvgIconProps = {
  inheritViewBox?: boolean;
  sx?: SxProps<Theme>;
};

export const LogoIcon = (props: LogoSvgIconProps) => {
  const { inheritViewBox, sx } = props;
  return (
    <SvgIconBase
      component={LogoIconSvg}
      inheritViewBox={inheritViewBox}
      sx={sx}
    />
  );
};

import React from 'react';

import { SvgIcon } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export type SvgIconBaseProps = {
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  inheritViewBox?: boolean;
  sx?: SxProps<Theme>;
};

const SvgIconBase = (props: SvgIconBaseProps) => {
  const { component, inheritViewBox, sx } = props;
  return (
    <SvgIcon
      component={component}
      inheritViewBox={inheritViewBox}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

export default SvgIconBase;

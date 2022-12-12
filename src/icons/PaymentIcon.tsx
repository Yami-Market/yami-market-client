import { SxProps, Theme } from '@mui/material/styles';

import SvgIconBase from './SvgIconBase';
import { ReactComponent as AmericanExpressIconSvg } from './assets/american-express-log.svg';
import { ReactComponent as MasterCardIconSvg } from './assets/mastercard-logo.svg';
import { ReactComponent as VisaIconSvg } from './assets/visa-logo.svg';

export type PaymentIconProps = {
  sx?: SxProps<Theme>;
};

export const VisaIcon = (props: PaymentIconProps) => {
  const { sx } = props;
  return (
    <SvgIconBase
      component={VisaIconSvg}
      inheritViewBox
      sx={[{ fontSize: 80 }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

export const MasterCardIcon = (props: PaymentIconProps) => {
  const { sx } = props;
  return (
    <SvgIconBase
      component={MasterCardIconSvg}
      inheritViewBox
      sx={[{ fontSize: 80 }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

export const AmericanExpressIcon = (props: PaymentIconProps) => {
  const { sx } = props;
  return (
    <SvgIconBase
      component={AmericanExpressIconSvg}
      inheritViewBox
      sx={[{ fontSize: 80 }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
};

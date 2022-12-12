import { Link as RouterLink } from 'react-router-dom';

import { Box, Link } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import useNavbar from '../../hooks/useNavbar';
import { LogoIcon } from '../../icons/LogoIcon';

export type BrandTitleLinkProps = {
  sx?: SxProps<Theme>;
};

const BrandTitleLink = ({ sx }: BrandTitleLinkProps) => {
  const { setCategoryPopoverClose } = useNavbar();

  return (
    <Link
      component={RouterLink}
      to='/'
      // reloadDocument
      underline='none'
      sx={[
        theme => ({
          color: theme.palette.text.primary,
          fontSize: { xs: '18px', md: '24px' },
          fontWeight: 'light',
          whiteSpace: 'nowrap',
          marginRight: theme.spacing(1),
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center'
        }),
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      onMouseEnter={setCategoryPopoverClose}
    >
      <LogoIcon inheritViewBox sx={{ fontSize: '32px' }} />
      <Box sx={{ marginLeft: theme => theme.spacing(1) }}>Yami Market</Box>
    </Link>
  );
};

export default BrandTitleLink;

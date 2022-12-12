import { Box, Typography } from '@mui/material';

type ShippingInfoItemProps = {
  selected: boolean;
  deliveryType: string;
  deliveryDate: string;
};

const ShippingInfoItem = (props: ShippingInfoItemProps) => {
  const { selected, deliveryType, deliveryDate } = props;

  return (
    <Box
      sx={theme => ({
        px: 3,
        pt: 2,
        pb: 3,
        mb: 2,
        borderRadius: 1,
        border: '1px solid',
        borderColor: selected ? theme.palette.text.primary : 'transparent',
        backgroundColor: theme.palette.action.hover
      })}
    >
      <Typography variant='body1' sx={{ py: 1, flexGrow: 1, fontWeight: 500 }}>
        {deliveryType}
      </Typography>

      <Typography variant='body1' sx={{ py: 0.2 }}>
        {deliveryDate}
      </Typography>
    </Box>
  );
};

export default ShippingInfoItem;

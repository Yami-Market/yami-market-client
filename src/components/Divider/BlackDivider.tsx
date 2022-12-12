import { Divider, DividerProps } from '@mui/material';

const BlackDivider = (props: DividerProps) => {
  const { sx, ...dividerProps } = props;
  return (
    <Divider
      sx={[
        { backgroundColor: theme => theme.palette.text.primary },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...dividerProps}
    />
  );
};

export default BlackDivider;

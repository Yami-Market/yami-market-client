import { DotProps } from 'react-multi-carousel';

import { Box } from '@mui/material';

export const CustomDot = ({
  imageList,
  onClick,
  ...rest
}: DotProps & { imageList: string[] }) => {
  const { index, active } = rest;

  return (
    <Box
      sx={theme => ({
        padding: '3px',
        borderRadius: '6px',
        width: '60px',
        height: '60px',
        border: '1px solid',
        borderColor: active ? theme.palette.text.primary : 'transparent'
      })}
    >
      <img
        src={imageList[index || 0]}
        alt='product'
        draggable='false'
        onClick={onClick}
        style={{
          cursor: 'pointer',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: '6px'
        }}
      />
    </Box>
  );
};

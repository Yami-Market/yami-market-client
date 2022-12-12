import React from 'react';

import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';

export type ScrollToTopProps = {
  children: React.ReactElement;
};
const ScrollToTopButton = ({ children }: ScrollToTopProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'none', md: 'block' }
        }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollToTopButton;

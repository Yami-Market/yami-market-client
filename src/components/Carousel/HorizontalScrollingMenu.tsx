import React, { useContext, useEffect, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import { IconButton } from '@mui/material';

import { AngleLeftIcon, AngleRightIcon } from '../../icons/UIIcon';

type Props = {
  mdMatch: boolean;
  children:
    | React.ReactElement<{
        itemId: string;
      }>
    | React.ReactElement<{
        itemId: string;
      }>[];
};

const HorizontalScrollingMenuLeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <IconButton
      color='primary'
      disabled={disabled}
      onClick={() => scrollPrev()}
      sx={{
        height: '40px',
        width: '40px',
        padding: '0px',
        alignSelf: 'center'
      }}
    >
      <AngleLeftIcon fontSize={24} />
    </IconButton>
  );
};

const HorizontalScrollingMenuRightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleElements } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleElements.length && isLastItemVisible
  );

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <IconButton
      color='primary'
      disabled={disabled}
      onClick={() => scrollNext()}
      sx={{
        height: '40px',
        width: '40px',
        padding: '0px',
        alignSelf: 'center'
      }}
    >
      <AngleRightIcon fontSize={24} />
    </IconButton>
  );
};

const HorizontalScrollingMenu = ({ mdMatch, children }: Props) => {
  return (
    <ScrollMenu
      LeftArrow={mdMatch && HorizontalScrollingMenuLeftArrow}
      RightArrow={mdMatch && HorizontalScrollingMenuRightArrow}
    >
      {children}
    </ScrollMenu>
  );
};

export default HorizontalScrollingMenu;

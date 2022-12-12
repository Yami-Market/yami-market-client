/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext } from 'react';

export type NavbarProviderPros = {
  children: React.ReactNode;
};

const NavbarContext = createContext<{
  categoryAnchorEl: HTMLElement | null;
  setCategoryAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setCategoryPopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setCategoryPopoverClose: () => void;
  accountAnchorEl: HTMLElement | null;
  setAccountAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setAccountPopoverOpen: (
    ref: React.MutableRefObject<HTMLElement>
  ) => () => void;
  setAccountPopoverClose: () => void;
}>({
  categoryAnchorEl: null,
  setCategoryAnchorEl: () => {},
  setCategoryPopoverOpen: () => {},
  setCategoryPopoverClose: () => {},
  accountAnchorEl: null,
  setAccountAnchorEl: () => {},
  setAccountPopoverOpen: () => () => {},
  setAccountPopoverClose: () => {}
});

const NavbarProvider: React.FC<NavbarProviderPros> = ({ children }) => {
  const [categoryAnchorEl, setCategoryAnchorEl] =
    React.useState<HTMLElement | null>(null);
  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<HTMLElement | null>(null);

  const setCategoryPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const setCategoryPopoverClose = () => {
    setCategoryAnchorEl(null);
  };

  const setAccountPopoverOpen =
    (ref: React.MutableRefObject<HTMLElement>) => () => {
      setAccountAnchorEl(ref.current);
    };

  const setAccountPopoverClose = () => {
    setAccountAnchorEl(null);
  };

  return (
    <NavbarContext.Provider
      value={{
        categoryAnchorEl,
        setCategoryAnchorEl,
        setCategoryPopoverClose,
        setCategoryPopoverOpen,
        accountAnchorEl,
        setAccountAnchorEl,
        setAccountPopoverClose,
        setAccountPopoverOpen
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarProvider };

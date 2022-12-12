import { useContext } from 'react';

import { NavbarContext } from '../providers/NavbarProvider';

const useNavbar = () => {
  return useContext(NavbarContext);
};

export default useNavbar;

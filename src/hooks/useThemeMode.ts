import { useContext } from 'react';

import { ThemeContext } from '../providers/ThemeProvider';

const useThemeMode = () => {
  return useContext(ThemeContext);
};

export default useThemeMode;

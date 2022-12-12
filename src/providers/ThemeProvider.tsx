import React, { createContext, useEffect, useState } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { darkTheme, lightTheme } from '../theme/custom';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<{
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
  handleThemeChange: (newTheme: 'light' | 'dark' | 'system') => void;
}>({
  theme: 'light',
  resolvedTheme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleThemeChange: () => {}
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light'
  );
  const muiTheme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
      setResolvedTheme('dark');
    } else if (localStorage.getItem('theme') === 'light') {
      setTheme('light');
      setResolvedTheme('light');
    } else {
      setTheme('system');
      setResolvedTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, [resolvedTheme, prefersDarkMode]);

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
      setResolvedTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      setResolvedTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      setResolvedTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else if (newTheme === 'light') {
      setResolvedTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      setResolvedTheme(prefersDarkMode ? 'dark' : 'light');
      localStorage.setItem('theme', 'system');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, toggleTheme, handleThemeChange }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

import { createContext, useState } from 'react';
export const ThemeChannel = createContext();

function ThemeContext({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeChannel.Provider
      value={{
        theme,
        togletheme: () => (theme === 'light' ? 'dark' : 'light'),
        setTheme,
      }}
    >
      {children}
    </ThemeChannel.Provider>
  );
}

export default ThemeContext;

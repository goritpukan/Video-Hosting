import { createContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const getPreferredScheme = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';

  const [theme, setTheme] = useState("light");

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext;
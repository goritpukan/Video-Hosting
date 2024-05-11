import { createContext, useState } from "react";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const getTheme = () => {
    const localTheme = localStorage.getItem("theme")
    if(localTheme){
      return localTheme;
    }
    return getPreferredScheme();
  }
  const getPreferredScheme = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';

  const [theme, setTheme] = useState(getTheme());

  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext;
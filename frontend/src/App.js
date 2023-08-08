import React, { Suspense, createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import MainPage from "./Components/MainPage";
import Header from "./Components/Header";

export const ThemeContext = createContext(null);


export default function App() {

  const getPreferredScheme = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';
  
  const [theme, setTheme] = useState(getPreferredScheme());


  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Header />
          <Routes>
            <Route path="*" element={<h1>Error 404 not found</h1>}/>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Suspense>
      </ThemeContext.Provider>
    </>
  )
}
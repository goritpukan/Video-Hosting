import React from "react";
import { useContext } from "react";

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";
export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);
  return (
    <div id={theme} className="home-page">
      <span>Hello {auth.nickname}!</span>
    </div>
  )
}
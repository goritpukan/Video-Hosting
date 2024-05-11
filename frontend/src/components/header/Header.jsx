import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";

export default function Header() {
  const { auth } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
   const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
   }

  return (
    <div className="header" id={theme}>
      <button onClick={changeTheme}>Change theme</button>
      <img src=""></img>
      <span>{auth.nickname || <Link to="/signin">Sign in</Link>}</span>
    </div>
  )
}
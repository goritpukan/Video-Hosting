import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import axios from "axios";

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";

export default function Header() {

  const { auth } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.nickname) {
      theme === "dark" ? setAvatar("../../icons/white-user.png") : setAvatar("../../icons/black-user.png");
      console.log(Boolean(!auth.nickname));
      return;
    }

    if (auth.fromGoogle) {
      setAvatar(auth.img);
      console.log("ddd");
      return;
    }
    const fetchData = async () => {
      try {
        const data = await axios.get(`images/${auth.img}`);
        const base64String = btoa(String.fromCharCode(...new Uint8Array(data)));
        setAvatar(base64String);
      }catch (err){
        console.log(err);
      }
    }
    fetchData();

  }, []);

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <div id={theme} className="header">
      <button className="change-theme" onClick={changeTheme}><div className="background" /></button>
      <div className="header-profile">
        <img onClick={() => auth.nickname ? navigate("/profile") : navigate("/signin")}
          className="goto-profile"
          alt=""
          src={avatar}
        ></img>
        <span>{auth.nickname || <Link to="/signin">Sign in</Link>}</span>
      </div>
    </div>
  )
}
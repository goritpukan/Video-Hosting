import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";
export default function Signup() {
  const { setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("auth/signup", { email, password, nickname });
      setAuth(res.data);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="signup" id={theme}>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="nickname">Nickname</label>
        <input type="text"
          id="nickname"
          onChange={e => setNickname(e.target.value)}
          required
          minLength="6"
          maxLength="30" />
        <label htmlFor="email">Email</label>
        <input type="email"
          id="email"
          onChange={e => setEmail(e.target.value)}
          required
          minLength="6"
          maxLength="30" />
        <label htmlFor="password">Password</label>
        <input type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
          required
          minLength="6"
          maxLength="30" />
        <input type="submit" value="Sign up"/>
        <span>Already have an account?<Link to="/signin">Sign in</Link></span>
      </form>
    </div>
  )
}
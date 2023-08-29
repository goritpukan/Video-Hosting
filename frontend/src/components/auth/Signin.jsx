import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";

export default function Signin() {
  const { setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("auth/signin", { email, password });
      setAuth(res.data);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="signin" id={theme}>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
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
        <input type="submit" value="Sign In" />
        <span>Don't have an account?<Link to="/signup">Sign up</Link></span>
      </form>
    </div>
  )
}
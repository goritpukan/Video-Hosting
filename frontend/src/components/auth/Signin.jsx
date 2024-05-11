import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import GoogleButton from "react-google-button";

import axios from "axios";

import AuthContext from "../../context/AuthProvider";
import ThemeContext from "../../context/ThemeProvider";

import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import Loader from "../loader/Loader";
export default function Signin() {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastError = (err) => {
    toast.error(err?.response?.data?.message, {
      position: "top-left",
      theme: theme,
      autoClose: 3000
    });
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const res = await axios.post("auth/signin", { email, password });
      if (res.status === 200) {
        setAuth(res.data);
        navigate("/");
      }
    } catch (err) {
      toastError(err);
    }
    setIsLoading(false);
  }
  const signInWithGoogle = async () => {
    if (isLoading) return;
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const res = await axios.post("auth/google", {
          nickname: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        });
        setIsLoading(false);

        if (res.status === 200) {
          setAuth(res.data);
          navigate("/");
        }
      })
      .catch((err) => {
        toastError(err);
        setIsLoading(false);
      })
  }

  return (
    <div className="signin" id={theme}>
      <Loader visible={isLoading}/>
      <ToastContainer/>
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
        <input type="submit" disabled={isLoading} value={"Sign In"} />
        <GoogleButton onClick={signInWithGoogle} className="google-sign-in" type={theme} />
        <span>Don't have an account?<Link to="/signup">Sign up</Link></span>
      </form>
    </div>
  )
}
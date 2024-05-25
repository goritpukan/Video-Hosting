import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./components/auth/Auth.css";
import "./components/header/Header.css"
import "./components/home/Home.css";
import "./components/profile/Profile.css";
import "./components/loader/Loader.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";


export default function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<Loader visible={true} />}>
        <Routes>
          <Route path="*" element={<h1>Error 404 not found</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </>
  )
}
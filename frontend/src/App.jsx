import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./components/auth/Auth.css";
import "./components/header/Header.css"
import "./components/loader/Loader.css"
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import Home from "./components/home/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";


export default function App() {

  return (
    <>
      <Suspense fallback={<Loader visible={true} />}>
        <Routes>
          <Route path="*" element={<h1>Error 404 not found</h1>} />
          <Route path="/" element={<><Header/> <Home /></>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </>
  )
}
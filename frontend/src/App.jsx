import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "./components/auth/Auth.css";

import Home from "./components/Home";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";


export default function App() {

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="*" element={<h1>Error 404 not found</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </>
  )
}
import React from "react";
import { useContext, useEffect } from "react";

import AuthContext from "../../context/AuthProvider";

export default function Home() {


  const { auth } = useContext(AuthContext);
  return (
    <>
      <h1>Hello {auth.nickname}!</h1>
      <h2>Your email is: {auth.email}</h2>
    </>
  )
}
import React, { useContext, useState } from "react";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import UserContext from "./contexts/UserContext/UserContext";

export const Spa = () => {
const user = useContext(UserContext)
  return (
    <>
        {user.user ? <Home /> : <Login />}
    </>
  )
}

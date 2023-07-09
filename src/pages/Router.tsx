import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagesContainer from "./PagesContainer";
import SignIn from "./FormPages/SignIn";
import Home from "./Home";
import Success from "./FormPages/Success";
import SignUp from "./FormPages/SignUp";
import Confirmation from "./FormPages/Confirmation";
import Content from "./Content";
import ResetPassword from "./FormPages/ResetPassword";
import NewPassword from "./FormPages/NewPassword";

export enum RoutesList {
  Home = "/",
  SinglePost = "/blog/:postId",
  Search = "/blog/search",
  AddPost = "/blog/add",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Confirm = "/activate/:uid/:token",
  Success = "/sign-up/success",
  ResetPassword = "/reset-password",
  NewPassword = "/new-password",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route path={RoutesList.SinglePost} element={<Content />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.Success} element={<Success />} />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.Confirm} element={<Confirmation />} />
          <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
          <Route path={RoutesList.Default} element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React, { useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, getUserInfo } from "../redux/reducers/authSlice";
import { PostSelectors, getMyPosts } from "../redux/reducers/postSlice";
import Search from "./Search";
import AddPost from "./AddPost/AddPost";
import { PER_PAGE } from "../utils/constants";

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
  NewPassword = "/password/reset/confirm/:uid/:token",
  Default = "*",
}

const Router = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PagesContainer />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route path={RoutesList.SinglePost} element={<Content />} />
          <Route
            path={RoutesList.AddPost}
            element={
              isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.SignIn} />
            }
          />
          <Route path={RoutesList.Success} element={<Success />} />
          <Route
            path={RoutesList.SignIn}
            element={
              !isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home} />
            }
          />
          <Route
            path={RoutesList.SignUp}
            element={
              !isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.Home} />
            }
          />
          <Route path={RoutesList.Confirm} element={<Confirmation />} />
          <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
          <Route path={RoutesList.NewPassword} element={<NewPassword />} />
          <Route path={RoutesList.Search} element={<Search />} />
          <Route path={RoutesList.Default} element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

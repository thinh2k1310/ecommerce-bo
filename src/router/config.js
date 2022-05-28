import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error.js";
import EnterEmail from "pages/Authentication/FogotPassword/EnterEmail";
import UpdatePassWord from "pages/Authentication/FogotPassword/UpdatePassWord";
import CategoryCreation from "pages/Home/Categories/CategoryCreation/CategoryCreation";
import CategoryManagement from "pages/Home/Categories/CategoryManagement/CategoryManagement";
import Merchant from "pages/Home/Merchants/Merchants/Merchants";
import MerchantRequest from "pages/Home/Merchants/MerchantRequest/MerchantRequest";
import EditMerchant from "pages/Home/Merchants/EditMechan/EditMerchant";

export const routeConfig = [
  {
    path: "/login",
    isPrivate: false,
    exact: true,
    component: Login
  },
  {
    path: "/forgot-password-enter-email",
    isPrivate: false,
    exact: true,
    component: EnterEmail
  },
  {
    path: "/forgot-password-update-password/:token",
    isPrivate: false,
    exact: true,
    component: UpdatePassWord
  },
  {
    path: "/manage-categories-new",
    isPrivate: true,
    exact: true,
    component: CategoryCreation
  },
  {
    path: "/manage-categories",
    isPrivate: true,
    exact: true,
    component: CategoryManagement
  },
  {
    path: "/manage-merchants",
    isPrivate: true,
    exact: true,
    component: Merchant
  },
  {
    path: "/manage-merchants-request",
    isPrivate: true,
    exact: true,
    component: MerchantRequest
  },
  {
    path: "/manage-merchants-edit",
    isPrivate: true,
    exact: true,
    component: EditMerchant
  },
  { path: "*", component: Error }
];

const PrivateRoute = (privateProps) => {
  const { user } = useSelector((state) => state.user);
  if (user) {
    return <privateProps.component {...privateProps} />;
  }

  return <Redirect to="/login" />;
};

export const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) =>
        route.isPrivate ? (
          <PrivateRoute {...route} />
        ) : (
          <route.component {...props} />
        )
      }
    />
  );
};

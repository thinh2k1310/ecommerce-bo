import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "pages/Authentication/Login/Login";
import Error from "pages/Error/Error.js";
import EnterEmail from "pages/Authentication/ForgotPassword/EnterEmail";
import UpdatePassWord from "pages/Authentication/ForgotPassword/UpdatePassWord";
import CategoryCreation from "pages/Home/Categories/CategoryCreation/CategoryCreation";
import CategoryManagement from "pages/Home/Categories/CategoryManagement/CategoryManagement";
import Merchant from "pages/Home/Merchants/Merchants/Merchants";
import MerchantRequest from "pages/Home/Merchants/MerchantRequest/MerchantRequest";
import CreateMerchant from "pages/Home/Merchants/AddMechant/CreateMerchant";
import CategoryEdit from "pages/Home/Categories/CategoryEdit/CategoryEdit";
import SubCateManage from "pages/Home/Categories/SubCateManage/SubCateManage";
import NewSubCate from "pages/Home/Categories/NewSubCate/NewSubCate";
import EditSubCate from "pages/Home/Categories/EditSubCate/EditSubCate";
import ResetPassword from "pages/Authentication/ForgotPassword/ResetPassword";

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
    path: "/reset-password",
    isPrivate: false,
    exact: true,
    component: ResetPassword
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
    path: "/manage-merchants-create",
    isPrivate: true,
    exact: true,
    component: CreateMerchant
  },
  {
    path: "/manage-categories-edit/:id",
    isPrivate: true,
    exact: true,
    component: CategoryEdit
  },
  {
    path: "/manage-sub-categories/:id",
    isPrivate: true,
    exact: true,
    component: SubCateManage
  },
  {
    path: "/create-sub-categories/:id",
    isPrivate: true,
    exact: true,
    component: NewSubCate
  },
  {
    path: "/edit-sub-categories/:id",
    isPrivate: true,
    exact: true,
    component: EditSubCate
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

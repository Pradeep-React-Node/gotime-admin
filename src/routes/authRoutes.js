import React from "react";
const Login = React.lazy(() => import("../views/auth/login/index"));

const authRoutes = [{ path: "/login", name: "Login Page", component: Login }];

export default authRoutes;

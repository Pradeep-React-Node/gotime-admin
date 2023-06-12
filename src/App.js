import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Loader from "./components/loader";
import "./scss/style.scss";
import "./index.css";
import { getUserDetails } from "./views/auth/login/apis";
import authRoutes from "./routes/authRoutes";
import { CContainer, CFade } from "@coreui/react";
import axios from "axios";
const Loading = ({ loading }) => {
  return (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
};

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.commonReducer.loader);
  useEffect(() => {
    dispatch(getUserDetails());
  });
  return (
    <>
      <Loader loading={loading} />
      <Switch>
        {authRoutes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <CFade>
                    <route.component {...props} />
                  </CFade>
                )}
              />
            )
          );
        })}
        <Route
          //exact={true}
          path="/"
          name="Home"
          render={(props) => <TheLayout {...props} />}
        />
      </Switch>
    </>
  );
  // }
};

export default App;

export { Loading };

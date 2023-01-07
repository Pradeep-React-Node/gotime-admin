import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { useHistory } from "react-router-dom";
import localStorageConstants from "../constants/localstorageConstants";
import Page404 from "src/views/pages/page404/Page404";
import Loader from "src/components/loader";
// import Page404 from "src/views/pages/page404/Page404";

const TheLayout = () => {
  const userId = localStorage.getItem(localStorageConstants.userId);
  if (!userId) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default TheLayout;

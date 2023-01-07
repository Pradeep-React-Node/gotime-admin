import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { login } from "./apis";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_DATA } from "../actions";
import localStorageConstants from "src/constants/localstorageConstants";
import { SET_LOADER } from "src/redux/actions";
import colors from "src/constants/colors";
import PasswordInput from "src/components/formFields/passwordInput";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // const [loader, setLoader] = useState(false);

  const [userId, setUserId] = useState(
    localStorage.getItem(localStorageConstants.userId)
  );
  if (userId) {
    return <Redirect to="/dashboard" />;
  }
  const onLoginPress = () => {
    dispatch({ type: SET_LOADER, payload: true });
    // dispatch({ type: SET_USER_DATA, payload: { id: 123 } });
    login(
      {
        email: email,
        password: password,
      },
      (data) => {
        if (data?.status === "success") {
          if (
            data?.data?.user_details?.user_type != "hr" &&
            data?.data?.user_details?.user_type != "super_admin"
          ) {
            setErrors({ message: "Your login is restricted" });
            dispatch({ type: SET_LOADER, payload: false });
          } else {
            localStorage.setItem(
              localStorageConstants.userId,
              data?.data?.user_details?._id
            );
            localStorage.setItem(
              localStorageConstants.accessToken,
              data?.data?.token
            );
            dispatch({
              type: SET_USER_DATA,
              payload: data?.data?.user_details,
            });
            dispatch({ type: SET_LOADER, payload: false });
            setUserId(data?.data?.user_details?.user_id);
          }
        } else {
          setErrors({ message: data?.message });
          // alert(data?.message);
          dispatch({ type: SET_LOADER, payload: false });
        }
      },
      () => {
        dispatch({ type: SET_LOADER, payload: false });
      }
    );
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <div className="mb-4">
                      <PasswordInput value={password} setValue={setPassword} />
                    </div>

                    {errors?.message ? (
                      <CRow className="mb-4">
                        <CCol xs="12">
                          <span style={{ color: "red", fontWeight: 500 }}>
                            {errors?.message}
                          </span>
                        </CCol>
                      </CRow>
                    ) : null}
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={onLoginPress}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Go Time</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Visit Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;

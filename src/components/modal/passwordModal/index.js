import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import SimpleButton from "../../buttons/simpleButton";
import SimpleInput from "../../formFields/simpleInput";
import copy from "copy-to-clipboard";
import "./style.css";
import { useSnackbar } from "notistack";
import ReactTooltip from "react-tooltip";
import { getUserPassword } from "src/views/employee/add/api";
// import { SET_LOADER } from "../redux/actions";
// import { deleteMilestoneTasks } from "./apis";

const PasswordModal = (props) => {
  const {
    passwordModalVisible,
    secondaryCtaFunction = () => {},
    organizationId = "",
  } = props;
  const dispatch = useDispatch();
  const toggle = () => secondaryCtaFunction();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userCredentials, setUserCredentials] = useState({});

  useEffect(() => {
    getUserPassword(
      organizationId,
      (data) => {
        setUserCredentials({
          user_id: data?.data?.user_id,
          password: data?.data?.password,
        });
      },
      () => {
        console.log("Not found");
      }
    );
  }, [passwordModalVisible]);

  return (
    <div>
      <Modal isOpen={passwordModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>User's Credentials</ModalHeader>
        <ModalBody
          style={{
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div>User Id : {userCredentials?.user_id}</div>
          <div>Password : {userCredentials?.password}</div>
        </ModalBody>
        <ModalFooter className="password_modal_footer">
          <Button
            className="password_modal_copy_button"
            onClick={() => {
              copy(
                `User Id : ${userCredentials?.user_id}\nPassword : ${userCredentials?.password}`
              );
              enqueueSnackbar("Credentials copied to clipboard.", {
                variant: "success",
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
              });
            }}
          >
            <span>Click here to copy the Credentials</span>
            <span>
              <i className="ml-2 fas fa-copy"></i>
            </span>
          </Button>
          <a
            href={`mailto:${userCredentials?.email}?subject=Credentials&body=UserId:${userCredentials?.user_id}%0D%0APassword:${userCredentials?.password}`}
            data-tip="Mail Credentials"
          >
            <i className="fas fa-envelope mail-icon"></i>
          </a>
          <ReactTooltip />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PasswordModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SET_LOADER } from "src/redux/actions";
import ModalButton from "../buttons/modalButton";
import SimpleButton from "../buttons/simpleButton";
// import { SET_LOADER } from "../redux/actions";
// import { deleteMilestoneTasks } from "./apis";

const CustomModal = (props) => {
  const {
    setIsModalVisible,
    isModalVisible,
    secondaryCtaFunction = () => {},
    primaryCtaFunction = () => {},
    primaryText = "",
    secondaryText = "",
    innerText = "",
    title = "",
    loader = false,
  } = props;
  const toggle = () => setIsModalVisible(!isModalVisible);

  return (
    <div>
      <Modal isOpen={isModalVisible} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{innerText}</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="cancel-btn"
            style={{
              background: "none",
              border: "none",
              fontWeight: "bold",
              color: "#54a3b3",
            }}
            onClick={secondaryCtaFunction}
          >
            {secondaryText}
          </Button>{" "}
          <div onClick={primaryCtaFunction}>
            <ModalButton loader={loader} title={primaryText} />
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;

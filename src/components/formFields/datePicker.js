import React from "react";
import { CFormGroup, CInput, CLabel } from "@coreui/react";
import moment from "moment";

const DatePicker = ({
  type = "date",
  id = "",
  title = "",
  placeholder = "",
  value = "",
  error,
  required,
  onChange = () => {},
}) => {
  return (
    <>
      <CLabel>
        {title}

        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <CInput
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        initialView="year"
      />
      {error ? (
        <CLabel htmlFor="company" style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default DatePicker;

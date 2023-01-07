import React from "react";
import { CFormGroup, CInput, CLabel } from "@coreui/react";

const SimpleInput = ({
  id = "",
  title = "",
  placeholder = "",
  value = "",
  type = "text",
  className = "",
  onChange = () => { },
  onBlur = () => { },

  error,
  required = false,
}) => {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <CInput
        id={id}
        type={type}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={{ borderColor: error ? "#e55353" : "" }}
      />

      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default SimpleInput;

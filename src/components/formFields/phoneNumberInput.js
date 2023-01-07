import React from 'react';
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { CLabel } from "@coreui/react";

function PhoneNumberInput({
  value = "",
  onChange = () => { },
  id = "",
  error = "",
  title = "",
  required = false
}
) {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>
      <PhoneInput
        country={"in"}
        inputStyle={{
          width: "100%"
        }}
        value={value}
        onChange={onChange}
        id={id}
        error={error}
        required
      />
      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  )
}

export default PhoneNumberInput

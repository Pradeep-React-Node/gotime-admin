import React from "react";
import { CSelect, CLabel } from "@coreui/react";

const Select = ({
  id = "",
  title = "",
  options = [],
  valueAccessor = "value",
  keyAccessor = "key",
  value = "",
  error,
  required,
  onChange = () => { },
  disabled = false,
}) => {
  return (
    <>
      <CLabel htmlFor={id}>
        {title}
        {required ? <span style={{ color: "red" }}> *</span> : null}
      </CLabel>

      <CSelect
        disabled={disabled}
        custom
        name={"select"}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options?.map((item, index) => (
          <option value={item[valueAccessor]}>{item[keyAccessor]}</option>
        ))}
      </CSelect>
      {error ? (
        <CLabel htmlFor={id} style={{ color: "#e55353" }}>
          {error}
        </CLabel>
      ) : null}
    </>
  );
};

export default Select;

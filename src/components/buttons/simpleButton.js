import React from "react";
import { CButton } from "@coreui/react";

const SimpleButton = ({
  title = "",
  className = "",
  style = {},
  color = "primary",
  onClick = () => { },
  type = "",
  ref
}) => {
  return (
    <CButton
      type={type}
      style={style}
      onClick={onClick}
      color={color}
      className={className}
      ref={ref}
    >
      {title}
    </CButton>
  );
};
export default SimpleButton;

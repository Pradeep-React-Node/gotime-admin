import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { logout } from "src/utils/system";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TheHeaderDropdown = () => {
  const organizationId = useSelector(
    (state) => state?.auth?.userDetails?.organization_id
  );
  const dispatch = useDispatch();
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <i class="fas fa-user-circle" style={{ fontSize: 30 }}></i>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem> */}
        <CDropdownItem>
          <Link to={`/profile/edit/${organizationId}`}>
            <CIcon name="cil-user" className="mfe-2" />
            Profile{" "}
          </Link>
        </CDropdownItem>

        {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
        <CDropdownItem>
          <Link to="/changePassword">
            <CIcon name="cil-settings" className="mfe-2" />
            Change Password{" "}
          </Link>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Link to="">
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Lock Account
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

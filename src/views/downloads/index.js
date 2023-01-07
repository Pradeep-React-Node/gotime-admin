import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { downloadEmployees } from './apis';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOADER } from 'src/redux/actions';

function Download() {
  const dispatch = useDispatch()
  const organization_id = useSelector((state) => state?.auth?.userDetails?.organization_id)
  return (
    <div>
      <CCol sm="12">
        <CCard>
          <CCardBody>
            <CListGroup>
              <CListGroupItem className="d-flex justify-content-space-between">
                <p style={{ margin: 0, width: "100%" }}>Download All Employees</p>
                <a href={`${process.env.REACT_APP_API_BASE_URL}api/user/export?_id=${organization_id}`}>Download</a>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default Download

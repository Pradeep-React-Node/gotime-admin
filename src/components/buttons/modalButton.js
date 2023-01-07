import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/index';
import { Spinner } from "react-bootstrap";
import colors from 'src/constants/colors';
import Colors from 'src/constants/colors';

function ModalButton({ title, loader, icon, setLoader }) {
  return (
    <button
      disabled={loader}
      className="default-btn"
      style={{ outline: "none", backgroundColor: Colors.red }}
    >
      {loader ? (
        <Spinner animation="border" role="status" style={{ width: 25, height: 25 }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
        // <Loader loading={loading} />
      ) :
        title
      }

    </button>
  )
}

export default ModalButton


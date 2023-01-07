import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { CCol, CLabel } from "@coreui/react";
import CustomLightBox from "../lightbox";
import { useLightbox } from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { getPresignedUrl } from "src/views/employee/add/api";
import { useSelector } from "react-redux";
import classNames from "classnames";

const FilePicker = ({
  error,
  required,
  title,
  onFileSelect,
  filename,
  userId,
  accept = ".png, .jpg, .jpeg",
}) => {
  const imageInputRef = useRef();

  const [selectedImage, setSelectedImage] = useState();
  const [imageError, setImageError] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [url, setUrl] = useState([]);

  const fileSelect = (event) => {
    console.log("asdasdasd");
    setImageError("");
    setSelectedImage();
    var file = event.target.files[0];
    if (file?.size / 1024 > 1024) {
      alert("Please choose an image below 1 MB");
      setImageError("Please choose an image below 1 MB");
      return;
    }
    console.log(event.target.files, "event.target.files");
    onFileSelect(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <CCol style={{ paddingLeft: 0 }}>
      {title ? (
        <CLabel>
          {title} {required ? "*" : null}
        </CLabel>
      ) : null}

      <input
        ref={imageInputRef}
        type="file"
        class="custom-file-input"
        onChange={fileSelect}
        accept={accept}
        style={{ display: "none" }}
      />

      <div className="d-flex">
        <div className="custom-filepicker-choose-input">
          {imagePath
            ? selectedImage?.name?.slice(0, 10) + "..."
            : // <img
              //   src={imagePath}
              //   style={{ height: 25, width: 25, marginRight: 10 }}
              // />
              "Choose File"}
        </div>
        <div className="custom-filepicker-browse-button">
          <div onClick={() => imageInputRef.current.click()}> Browse </div>
        </div>
      </div>

      {error ? <CLabel style={{ color: "red" }}>{error}</CLabel> : null}
    </CCol>
  );
};

export default FilePicker;

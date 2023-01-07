import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { CCol, CLabel } from "@coreui/react";
import CustomLightBox from "../lightbox";
import { useLightbox } from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import { getPresignedUrl } from "src/views/employee/add/api";
import { useSelector } from "react-redux";
import classNames from "classnames";

const MultiFilesPicker = ({
  error,
  required,
  title,
  onFileSelect,
  filename,
  userId,
  accept = ".png, .jpg, .jpeg",
}) => {
  const imageInputRef = useRef();
  const { openLightbox } = useLightbox();

  const [selectedImage, setSelectedImage] = useState();
  const [imageError, setImageError] = useState("");
  const [imagePath, setImagePath] = useState([]);

  const fileSelect = (event) => {
    console.log("asdasdasd");
    setImageError("");
    setSelectedImage();
    var filesList = event.target.files;
    var files = Array.from(filesList);
    // if (file?.size / 1024 > 1024) {
    //   alert("Please choose an image below 1 MB");
    //   // setImageError("Please choose an image below 1 MB");
    //   return;
    // }
    console.log(files, "event.target.files");
    onFileSelect(filesList);
    setSelectedImage(files);
    var urlsList = [];
    for (let i = 0; i < filesList.length; i++) {
      var fileUrl = URL.createObjectURL(filesList[i]);
      urlsList.push(fileUrl);
    }
    setImagePath(urlsList);
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
        multiple
      />

      <div className="d-flex">
        {/* {url[0]} */}
        <div className="d-flex custom-filepicker-choose-input">
          {imagePath?.length > 0
            ? imagePath?.length + " files"
            : // imagePath?.slice(0, 2)?.map((item) => (
              //     <img
              //       // onClick={() => openLightbox()}
              //       src={item}
              //       style={{ height: 25, width: 25, marginRight: 10 }}
              //     />
              //   ))
              "Choose File"}
        </div>
        <div
          className="custom-filepicker-browse-button"
          onClick={() => imageInputRef.current.click()}
        >
          <div> Browse </div>
        </div>
      </div>

      {/* {error ? <CLabel style={{ color: "#e55353" }}>{error}</CLabel> : null}
      <div style={{ display: "none" }} key={imagePath}>
        <CustomLightBox>
          <img
            src={imagePath ? imagePath : imagePath}
            style={{ height: 300, width: 300 }}
          />
        </CustomLightBox>
      </div> */}
    </CCol>
  );
};

export default MultiFilesPicker;

import React, { useEffect, useState } from "react";
import localStorageConstants from "src/constants/localstorageConstants";
import { getFileTypeFromPresSignedUrl } from "src/utils/files";
import { getPresignedUrl } from "src/views/employee/add/api";

const ImagePreview = ({
  onClickDelete,
  url: urlFromProps,
  filename,
  userId,
}) => {
  const [url, setUrl] = useState(urlFromProps);

  useEffect(() => {
    if ((userId, filename)) {
      getPresignedUrl(
        {
          user_id: userId,
          filename: filename,
        },
        (data) => {
          if (data?.status === "success") {
            console.log(data, "dataUrl");
            console.log(data?.urls, "urlsss");
            setUrl(data?.urls[0]);
          }
        }
      );
    }
  }, [userId, filename]);

  if (!url) {
    return null;
  }
  return (
    <div>
      {onClickDelete ? (
        <div
          style={{
            position: "relative",
            left: 16,
            top: 10,
            color: "red",
            cursor: "pointer",
            width: 10,
          }}
          onClick={() => {
            onClickDelete();
          }}
        >
          <i className="fas fa-times-circle image-delete-icon"></i>
        </div>
      ) : null}
      {getFileTypeFromPresSignedUrl(url) !== "pdf" ? (
        <img
          onClick={() => {
            console.log("asdassssss");
          }}
          src={url}
          style={{ height: 25, width: 25, marginRight: 2 }}
          key={url}
        />
      ) : (
        <a style={{ textDecoration: "none" }} href={url} target="_blank">
          <i class="fas fa-file-pdf" style={{ fontSize: 30 }}></i>
        </a>
      )}
    </div>
  );
};

export default ImagePreview;

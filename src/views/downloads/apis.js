const { default: apiClient } = require("src/apis/api-client");
const { default: apiUrls } = require("src/apis/apis");

const downloadEmployees = async (
  dataToSend,
  successCallback = () => { },
  failCallback = () => { }
) => {
  try {
    const data = await apiClient.post(apiUrls.employee.downloadEmployees, dataToSend);
    console.log(data, "downloadEmployees-success");
    data.blob().then((blob) => {
      var file = window.URL.createObjectURL(blob);
      window.location.assign(file);
      console.log(data, file, "downloadEmployees-success");
      successCallback(data);
    });
  } catch (err) {
    console.log(err, "downloadEmployees-error");
    failCallback();
  }
};

export { downloadEmployees };

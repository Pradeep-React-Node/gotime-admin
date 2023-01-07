const { default: apiClient } = require("src/apis/api-client");
const { default: apiUrls } = require("src/apis/apis");

const login = async (
  dataToSend,
  successCallback = () => {},
  failCallback = () => {}
) => {
  try {
    const { data = {} } = await apiClient.post(apiUrls.auth.login, dataToSend);
    console.log(data, "login-success");
    successCallback();
  } catch (err) {
    console.log(err, "login-error");
    failCallback();
  }
};

export { login };

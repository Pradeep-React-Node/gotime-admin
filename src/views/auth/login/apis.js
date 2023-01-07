import localStorageConstants from "src/constants/localstorageConstants";
import { SET_USER_DATA } from "../actions";

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
    successCallback(data);
  } catch (err) {
    console.log(err, "login-error");
    failCallback();
  }
};

const getUserDetails =
  (successCallback = () => {}, failCallback = () => {}) =>
  async (dispatch) => {
    let userId = await localStorage.getItem(localStorageConstants.userId);
    try {
      const { data = {} } = await apiClient.get(apiUrls.user.findOne(userId));
      console.log(data, "getUserDetails-success");
      successCallback(data);
      dispatch({ type: SET_USER_DATA, payload: data?.data });
    } catch (err) {
      console.log(err, "getUserDetails-error");
      failCallback();
    }
  };

export { login, getUserDetails };

const baseUrlWithSlash = process.env.REACT_APP_API_BASE_URL;

const apiUrls = {
  auth: {
    //login: "api/auth/login",
  },
  // userDocuments: {
  //   deleteUserDocument: (id) => `api/userDocument?_id=${id}`,
  // },
};

export { baseUrlWithSlash as apiBaseUrl };
export default apiUrls;

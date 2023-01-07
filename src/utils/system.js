const { LOGOUT } = require("src/redux/actions");

const logout = (props) => (dispatch) => {
  console.log("Logout");
  localStorage.clear();
  window.location.reload();
  // dispatch({ type: LOGOUT });
};

export { logout };

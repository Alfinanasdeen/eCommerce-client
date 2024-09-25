import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
  } catch (err) {
    console.error("Login failed:", err); 
    dispatch(loginFailure());
  }
};

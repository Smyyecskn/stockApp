import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  registerSuccess,
} from "../features/authSlice";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login işlemi basarısız");
      console.log(error);
    }
    const register = async (registerInfo) => {
      // dispatch(registerSuccess());
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        registerInfo
      );
      dispatch(registerSuccess());
    };
    const logout = async () => {};
  };
  return { login, register, logout };
};

export default useAuthCalls;

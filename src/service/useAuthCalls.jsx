// import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
// import {  useSelector } from "react-redux"
import useAxios from "./useAxios";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth)
  const { axiosWithToken, axiosPublic } = useAxios();

  //!  APIYE VERİLERİMİZİ GÖNDERDİK. LOGİN İŞLEMİ YAPTIK.

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login/`,
      //   userInfo
      // )
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi basarili.");
      navigate("/stock");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login işlemi başarisiz oldu.");
      console.log(error);
    }
  };
  //!  APIYE VERİLERİMİZİ GÖNDERDİK.REGİSTER İŞLEMİ YAPTIK.
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users/`,
      //   userInfo
      // )
      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //! APİDEN VERİLERİMİZİ TOKENLA ALIP LOGOUT İŞLEMİ YAPTIK.
  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },//!TOKEN ALMA İŞLEMİ BUNU TEKRARDAN AXİOS COMP YAPTIK.
      // })
      await axiosWithToken.get("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarili.");
      dispatch(logoutSuccess());
      // navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarisiz oldu.");
    }
  };

  return { login, register, logout };
};

export default useAuthCalls;

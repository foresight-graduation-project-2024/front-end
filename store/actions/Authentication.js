import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";

export const getUserInfo = (id) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const token = await AsyncStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    const response = await axios.get(`${baseUrl}/users/${id}`, { headers });
    await dispatch(saveUserInfo(response.data));
  } catch (error) {
    console.log("getUserInfo ERROR ==>", error);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const verifyLogIn = (authData, isRememberMe) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const response = await axios.post(`${baseUrl}/login`, authData);
    const token = response.data.token;
    const id = response.data.id;

    AsyncStorage.setItem("authToken", token);
    AsyncStorage.setItem("userID", id.toString());
    AsyncStorage.setItem("isRemember", isRememberMe.toString());

    await dispatch(getUserInfo(id));
    return response.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(uiStopLoading());
  }
};

export const signInFailedThunk = (payload) => async (dispatch, getState) => {
  dispatch(signInFailed(payload));
  return {
    ...getState(),
    auth: {
      ...getState().auth,
      signInFailed: payload,
    },
  };
};

export const accountDeactivatedThunk =
  (payload) => async (dispatch, getState) => {
    dispatch(AccountDeactivated(payload));
    return {
      ...getState(),
      auth: {
        ...getState().auth,
        accountDeactivated: payload,
      },
    };
  };

export const authLogout = () => async () => {
  AsyncStorage.removeItem("authToken");
  AsyncStorage.removeItem("role");
  AsyncStorage.removeItem("userID");
  AsyncStorage.removeItem("isRemember");
};

const signInFailed = (payload) => {
  return {
    type: actions.SIGNIN_FAILED,
    payload,
  };
};

const AccountDeactivated = (payload) => {
  return {
    type: actions.ACCOUNT_DEACTIVATED,
    payload,
  };
};

export const saveUserInfo = (user) => {
  return {
    type: actions.USER_SAVE,
    user: user,
  };
};

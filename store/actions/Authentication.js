import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";
import { unsubscribeFromUserTopic } from "./Notification";

export const getUserInfo = (id) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const token = await AsyncStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    };
    const response = await axios.get(`${baseUrl}/users/${id}`, { headers });
    // console.log("getUserInfo ==>", response.data);
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
    const role = response.data.role;
    const id = response.data.id;

    AsyncStorage.setItem("authToken", token);
    AsyncStorage.setItem("role", role);
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

export const authLogout = () => async (dispatch, getState) => {
  const userId = getState().user.user.id;
  await unsubscribeFromUserTopic(userId);
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

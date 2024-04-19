import axios from "axios";
import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";
import { getCurToken } from "./Users";

export const getAllUserNotification = (userId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/notification/${userId}`, { headers });
    dispatch(setUserNotification(response.data.content));
  } catch (error) {
    console.log("getAllUserNotification ERROR ==>", error);
    console.log("getAllUserNotification ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

const setUserNotification = (payload) => ({
  type: actions.SET_NOTIFICATION,
  payload,
});

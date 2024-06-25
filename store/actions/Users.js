import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as actions from "./actionTypes";
import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";

export const getCurToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("authToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `${token}`
  };
  return headers;
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/users`, { headers });
    // console.log(response.data)
    dispatch(setUsers(response.data || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", error);
    console.log("getUsers ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const addNewUser = (userData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + "/users",
      data: userData,
      headers
    });
    dispatch(getUsers());
    return true;
  } catch (err) {
    if (err.response.data.code === 2) {
      dispatch(emailExist(true));
    } else console.log("addNewUser ERROR CODE ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const editUserDetails = (id, newUserData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/users/${id}`,
      data: newUserData,
      headers
    });
    dispatch(getUsers());
    return true;
  } catch (err) {
    if (err.response.data.code === 2) {
      dispatch(emailExist(true));
    } else console.log("editUserDetails ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const deactivateUser = (id) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/users/${id}/deactivate`,
      headers
    });
    dispatch(getUsers());
  } catch (err) {
    console.log("DeactivateUser ERROR ==>", err);
    console.log("DeactivateUser ERROR CODE ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const activateUser = (id) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/users/${id}/activate`,
      headers
    });
    dispatch(getUsers());
  } catch (err) {
    console.log("ActivateUser ERROR ==>", err);
    console.log("ActivateUser ERROR CODE ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const changePassword = (id, newPassword) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/users/changePassword/${id}`,
      data: newPassword,
      headers
    });
    return true;
  } catch (err) {
    console.log("changePassword ERROR ==>", err);
    console.log("changePassword ERROR CODE ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const userSearch = (keyword) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    // console.log(keyword)
    keyword = keyword ? keyword.toLowerCase() : '';
    const headers = await dispatch(getCurToken());
    const response = await axios({
      method: "GET",
      url: `${baseUrl}/users/search?firstname=${keyword}&lastname=${keyword}&email=${keyword}`,
      headers
    });
    // console.log("Search:", response.data.content)
    dispatch(setUsers(response.data.content || []));
  } catch (error) {
    console.log("userSearch ERROR ==>", error);
    console.log("userSearch ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getUserTeamsAndTasks = (userId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/user/${userId}`, { headers });
    return response.data;
  } catch (error) {
    console.log("getUserTeamsAndTasks ERROR ==>", error);
    console.log("getUserTeamsAndTasks ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getUserTeams = (userId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/user/teams/${userId}`, { headers });
    dispatch(setUserTeams(response.data.content || []));
    return response.data.content;
  } catch (error) {
    console.log("getUserTeams ERROR ==>", error);
    console.log("getUserTeams ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getUserTasks = (userId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/user/tasks/${userId}`, { headers });
    dispatch(setUserTasks(response.data.content || []));
    return response.data.content;
  } catch (error) {
    console.log("getUserTasks ERROR ==>", error);
    console.log("getUserTasks ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const setUsers = (payload) => ({
  type: actions.GET_USERS,
  payload,
});

export const emailExist = (payload) => {
  return {
    type: actions.EMAIL_EXIST,
    payload,
  };
};

const setUserTeams = (payload) => ({
  type: actions.GET_USER_TEAMS,
  payload,
});

const setUserTasks = (payload) => ({
  type: actions.GET_USER_TASKS,
  payload,
});

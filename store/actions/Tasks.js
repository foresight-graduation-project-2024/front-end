import axios from "axios";
import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";
import { getCurToken } from "./Users";

export const getAllTeams = () => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/team`, { headers });
    // console.log("Get all teams ==>", response.data.content)
    dispatch(setTeams(response.data.content || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getTeamDetails = (teamId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/team/${teamId}`, { headers });
    // console.log("getTeamDetails response ==>", response.data);
    return response.data;
  } catch (error) {
    console.log("getTeamDetails ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const addTeam = (teamData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + "/team",
      data: teamData,
      headers
    });
    dispatch(getAllTeams());
    return true;
  } catch (err) {
    console.log("addNewUser ERROR ==>", err.response.data.code);
    console.log("addNewUser ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const editTeamDetails = (newTeamData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/team`,
      data: newTeamData,
      headers
    });
    dispatch(getAllTeams());
    return true;
  } catch (err) {
    console.log("editUserDetails ERROR ==>", err.response.data.code);
    console.log("editUserDetails ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const deleteTeam = (teamId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios.delete(`${baseUrl}/team/${teamId}`, { headers });
    dispatch(getAllTeams());
    return true;
  } catch (error) {
    console.log("deleteTeam ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/task`, { headers });
    // console.log("Get all tasks ==> ", response.data.content);
    dispatch(setTasks(response.data.content || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const getTeamTasks = (teamId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/task/${teamId}`, { headers });
    console.log("Get team tasks ==> ", response.data);
    // dispatch(setTasks(response.data.content || []));
  } catch (error) {
    console.log("getUsers ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const addTask = (teamId, taskData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + `/task/${teamId}`,
      data: taskData,
      headers
    });
    dispatch(getAllTasks());
    return true;
  } catch (err) {
    console.log("addNewUser ERROR ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const addComment = (taskId, commentDetails) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + `/task/${taskId}/comment`,
      data: commentDetails,
      headers
    });
    dispatch(getAllTasks());
    return true;
  } catch (err) {
    console.log("addNewUser ERROR ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const editTask = (teamId, newTaskData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading())
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: baseUrl + `/task/${teamId}`,
      data: newTaskData,
      headers
    });
    dispatch(getAllTasks());
    return true;
  } catch (err) {
    console.log("addNewUser ERROR ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const deleteTask = (teamId, taskId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios.delete(`${baseUrl}/task/${teamId}/${taskId}`, { headers });
    dispatch(getAllTasks());
  } catch (error) {
    console.log("deleteTask ERROR ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
}

export const setTeams = (payload) => ({
  type: actions.GET_TEAMS,
  payload,
});

export const setTasks = (payload) => ({
  type: actions.GET_TASKS,
  payload,
});
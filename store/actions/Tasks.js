import axios from "axios";
import * as actions from "./actionTypes";

import { baseUrl } from "../../constants/config";
import { uiStartLoading, uiStopLoading } from "./Ui";
import { getCurToken } from "./Users";

export const getAllTeams = () => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/team/summaries`, { headers });
    // console.log("Get all teams ==>", response.data.content)
    dispatch(setTeams(response.data.content || []));
  } catch (error) {
    console.log("getAllTeams ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const getTeamDetails = (teamId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/team/${teamId}`, { headers });
    // console.log("getTeamDetails response ==>", response.data);
    return response.data;
  } catch (error) {
    console.log("getTeamDetails ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const addTeam = (teamData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + "/team",
      data: teamData,
      headers,
    });
    dispatch(getAllTeams());
    return true;
  } catch (err) {
    console.log("addTeam ERROR CODE ==>", err.response.data.code);
    console.log("addTeam ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const editTeamDetails = (newTeamData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: `${baseUrl}/team`,
      data: newTeamData,
      headers,
    });
    dispatch(getAllTeams());
    return true;
  } catch (err) {
    console.log("editTeamDetails ERROR CODE ==>", err.response.data.code);
    console.log("editTeamDetails ERROR ==>", err);
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
    console.log("deleteTeam ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const getAllTasks = () => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/task`, { headers });
    // console.log("Get all tasks ==> ", response.data.content);
    dispatch(setTasks(response.data.content || []));
  } catch (error) {
    console.log("getAllTasks ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const addTask = (teamId, taskData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + `/task/${teamId}`,
      data: taskData,
      headers,
    });
    // dispatch(getTeamDetails(teamId));
    return true;
  } catch (err) {
    console.log("addTask ERROR CODE ==>", err.response.data.code);
    // console.log("addTask ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const getTaskDetails = (taskId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    const response = await axios.get(`${baseUrl}/task/${taskId}`, { headers });
    // console.log("getTaskDetails response ==>", response.data);
    return response.data;
  } catch (error) {
    console.log("getTaskDetails ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const editTask = (teamId, newTaskData) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "PUT",
      url: baseUrl + `/task/${teamId}`,
      data: newTaskData,
      headers,
    });
    // dispatch(getTeamDetails(teamId));
    return true;
  } catch (err) {
    console.log("editTask ERROR CODE ==>", err.response.data.code);
    console.log("editTask ERROR ==>", err);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const deleteTask = (teamId, taskId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    console.log(teamId, taskId);
    await axios.delete(`${baseUrl}/task/${teamId}/${taskId}`, { headers });
    dispatch(getAllTasks());
    return true;
  } catch (error) {
    console.log("deleteTask ERROR CODE ==>", error.response.data.code);
    console.log("deleteTask ERROR ==>", error);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const addMembers = (teamId, members) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + `/team/member/${teamId}`,
      data: members,
      headers,
    });
    dispatch(getTeamDetails(teamId));
    return true;
  } catch (error) {
    console.log("addMembers ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const deleteMember = (teamId, memberId) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios.delete(`${baseUrl}/team/member/${teamId}/${memberId}`, {
      headers,
    });
    dispatch(getTeamDetails(teamId));
    return true;
  } catch (error) {
    console.log("deleteMember ERROR CODE ==>", error.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const addComment = (taskId, commentDetails) => async (dispatch) => {
  try {
    dispatch(uiStartLoading());
    const headers = await dispatch(getCurToken());
    await axios({
      method: "POST",
      url: baseUrl + `/task/${taskId}/comment`,
      data: commentDetails,
      headers,
    });
    dispatch(getAllTasks());
    return true;
  } catch (err) {
    console.log("addComment ERROR CODE ==>", err.response.data.code);
  } finally {
    dispatch(uiStopLoading());
  }
};

export const setTeams = (payload) => ({
  type: actions.GET_TEAMS,
  payload,
});

export const setTasks = (payload) => ({
  type: actions.GET_TASKS,
  payload,
});

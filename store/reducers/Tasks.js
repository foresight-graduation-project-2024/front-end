import { GET_TEAMS, GET_TASKS } from "../actions/actionTypes";

const initialState = {
  teams: [],
  allTasks: [],
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case GET_TASKS:
      return {
        ...state,
        allTasks: action.payload,
      };
    default:
      return state;
  }
}

export default taskReducer;
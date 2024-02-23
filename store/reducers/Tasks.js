import { GET_TEAMS } from "../actions/actionTypes";

const initialState = {
  teams: [],
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    default:
      return state;
  }
}

export default taskReducer;
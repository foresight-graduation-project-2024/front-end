import { GET_USERS, USER_SAVE, EMAIL_EXIST, GET_USER_TEAMS, GET_USER_TASKS } from "../actions/actionTypes";

const initialState = {
  user: {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    role: null,
    enabled: null,
  },
  users: [],
  emailExist: false,
  userTeams: [],
  userTasks: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_EXIST:
      return {
        ...state,
        emailExist: action.payload,
      };
    case USER_SAVE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_TEAMS:
      return {
        ...state,
        userTeams: action.payload,
      };
    case GET_USER_TASKS:
      return {
        ...state,
        userTasks: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

import { UI_START_LOADING, UI_STOP_LOADING, SET_LANGUAGE } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  language: null,
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language || 'ar'
      };
    default:
      return state;
  }
};

export default UIReducer;

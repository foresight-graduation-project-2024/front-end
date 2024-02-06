import * as actions from "./actionTypes";

export const uiStartLoading = () => {
  return {
    type: actions.UI_START_LOADING
  };
};

export const uiStopLoading = () => {
  return {
    type: actions.UI_STOP_LOADING
  };
};
import { SET_NOTIFICATION } from "../actions/actionTypes";

const initialState = {
	userNotification: [],
};

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_NOTIFICATION:
			return {
				...state,
				userNotification: action.payload,
			};
		default:
			return state;
	}
};

export default notificationReducer;

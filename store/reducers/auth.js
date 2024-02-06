import { SIGNIN_FAILED, ACCOUNT_DEACTIVATED } from "../actions/Authentication";

const initialState = {
	signInFailed: false,
	accountDeactivated: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGNIN_FAILED:
			return {
				...state,
				signInFailed: action.payload,
			};
		case ACCOUNT_DEACTIVATED:
			return {
				...state,
				accountDeactivated: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;

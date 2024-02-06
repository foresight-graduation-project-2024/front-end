import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import authReducer from "./reducers/auth";
import userReducer from './reducers/users';
import UIReducer from './reducers/Ui';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: UIReducer,
});

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

import { combineReducers } from "redux";
// reducers
import authReducer from "./auth";
import eventReducer from "./event";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});

export default rootReducer;

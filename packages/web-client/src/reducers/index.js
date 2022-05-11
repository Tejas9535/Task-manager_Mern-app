import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import LoginReducer from './LoginReducer';

export default combineReducers({
  TaskReducer,LoginReducer
});

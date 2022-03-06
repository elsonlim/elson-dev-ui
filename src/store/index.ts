import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import activeUser from "../components/users/activeUserReducer";
import users from "../components/users/usersReducer";

const reducers = combineReducers({
  activeUser,
  users,
});

export type RootState = ReturnType<typeof reducers>;

export default createStore(reducers, {}, applyMiddleware(thunk));

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import activeUser from "../components/users/activeUserReducer";

const reducers = combineReducers({
  activeUser,
});

export type RootState = ReturnType<typeof reducers>;

export default createStore(reducers, {}, applyMiddleware(thunk));

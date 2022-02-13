import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginUser from "../components/navbar/userReducer";

const reducers = combineReducers({
  loginUser,
});

export type RootState = ReturnType<typeof reducers>;

export default createStore(reducers, {}, applyMiddleware(thunk));

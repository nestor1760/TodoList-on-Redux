import { combineReducers, createStore } from "redux";
import { todoReducer } from "./todoReducer";

const reducers = combineReducers({
  todos: todoReducer,
})

export const store = createStore(reducers)
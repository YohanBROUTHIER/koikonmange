import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UserApi } from "../../api";
import types from "./types";

const actualUser = UserApi.getUser()
let initialState;
if (!actualUser) {
  initialState = { isConnected: false };
} else {
  initialState = { ...actualUser, isConnected: true };
}
		
const sessionReducer = createReducer (initialState, (builder) => {		
	builder	
  .addCase(createAction(types.SIGNIN), (state, action) => {	
    return state = {...action.payload, isConnected: true};
	})
  .addCase(createAction(types.SIGNOUT), (state) => {
    UserApi.signout();
		return state = {isConnected: false};
	})
  .addCase(createAction(types.UPDATE_USER), (state, action) => {	
    return state = {state, ...action.payload};
	});
})		

export default sessionReducer;
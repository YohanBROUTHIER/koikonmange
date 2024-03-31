import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UserApi } from "../../services/api";
import types from "../types";

const actualUser = UserApi.getUser();
let initialState;
if (!actualUser) {
  initialState = { isConnected: false, isAdmin:false };
} else {
  initialState = { ...actualUser, isConnected: true };
}
		
const sessionReducer = createReducer (initialState, (builder) => {		
  builder	
    .addCase(createAction(types.signin), (state, action) => {	
      return state = { ...action.payload, isConnected: true} ;
    })
    .addCase(createAction(types.signout), (state) => {
      UserApi.signout();
      return state = { isConnected: false, isAdmin:false };
    })
    .addCase(createAction(types.sessionUpdate), (state, action) => {	
      return state = { state, ...action.payload };
    });
});		

export default sessionReducer;
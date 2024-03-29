import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	history:null,				
}						
						
const historyReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_HISTORY), (state, action) => {					
		state.history = action.payload				
	})
})						
						
export default historyReducer;
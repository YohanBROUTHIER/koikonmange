import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {						
	isAside:false				
}						
						
const isAsideReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_IS_ASIDE_TRUE), (state) => {					
		state.isAside = true			
	})
	.addCase(createAction(types.SET_IS_ASIDE_FALSE), (state) => {					
		state.isAside = false			
	})					
})						
						
export default isAsideReducer;
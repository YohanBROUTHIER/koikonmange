import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = null;

const historyReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setHistory), (state, action) => {					
      return state = action.payload;
    });
});
		
export default historyReducer;
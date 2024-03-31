import { createAction, createReducer } from "@reduxjs/toolkit";

import types from "../types";

const initialState = null;
		
const unitsReducer = createReducer (initialState, (builder) => {		
  builder	
    .addCase(createAction(types.setUnits), (state, action) => {	
      return state = [...action.payload];
    });
});		

export default unitsReducer;
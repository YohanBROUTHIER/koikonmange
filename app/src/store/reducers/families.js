import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = null;

const familiesReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setFamilies), (state, action) => {					
      return state = action.payload;
    });
});

export default familiesReducer;
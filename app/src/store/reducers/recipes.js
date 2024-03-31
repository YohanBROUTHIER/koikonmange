import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = null;

const recipesReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setRecipes), (state, action) => {					
      return state = action.payload;
    });
});

export default recipesReducer;
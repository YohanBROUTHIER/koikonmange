import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = null;

const recipesReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setRecipes), (state, action) => {					
      return state = action.payload;
    })
    .addCase(createAction(types.deleteRecipes), (state, action) => {					
      return state = state.filter(recipe => recipe.id !== parseInt(action.payload));
    });
});

export default recipesReducer;
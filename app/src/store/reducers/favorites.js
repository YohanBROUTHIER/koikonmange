import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = null;

const favoritesReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setFavorites), (state, action) => {					
      return state = action.payload;
    });
});

export default favoritesReducer;
import { createAction, createReducer } from "@reduxjs/toolkit";
import types from "../types";

const initialState = {};

const stylesReducer = createReducer (initialState, (builder) => {						
  builder
    .addCase(createAction(types.setStyles), (state, action) => {					
      return state = action.payload;
    })
    .addCase(createAction(types.addLeftMenu), (state) => {					
      state.leftMenu = true;
    })
    .addCase(createAction(types.removeLeftMenu), (state) => {					
      state.leftMenu = false;
    });
});

export default stylesReducer;
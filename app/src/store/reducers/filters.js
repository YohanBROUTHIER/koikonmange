import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import types from "../types";


const initialState = {
  families:[],
  ingredients:[],
  hunger: [],
  cookingTime: {min:"00:00",max:"08:00"},
  preparatingTime: {min:"00:00",max:"08:00"}
};

const filtersReducer = createReducer (initialState, (builder) => {
  builder
    .addCase(createAction(types.setFilterFamilies), (state,payload) => {
      state.families = payload;
    })
    .addCase(createAction(types.setFilterIngredients), (state,payload) => {
      state.ingredients = payload;
    })
    .addCase(createAction(types.setFilterHunger), (state,payload) => {
      state.hunger = payload;
    })
    .addCase(createAction(types.setFilterCookingTime), (state,payload) => {
      state.families = payload;
    })
    .addCase(createAction(types.setFilterPreparatinTime), (state,payload) => {
      state.families = payload;
    });
});

export default filtersReducer;
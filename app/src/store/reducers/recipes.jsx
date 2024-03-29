import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";

import { RecipeApi } from "../../api";
import types from "./types";


const initialState = {				
    recipes:null,
    recipesQuerry:null					
}						
						
const recipesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_RECIPES), (state, action) => {					
		state.recipes = action.payload				
	})
    .addCase(createAction(types.SET_RECIPES_QUERRY), (state, action) => {					
		state.recipesQuerry = action.payload			
	})

})						
						
export default recipesReducer;	
import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
export const initialStateIngredients = {						
    ingredients:[],					
    ingredientsChoices:[]
}						
						
const ingredientsReducer = createReducer (initialStateIngredients, (builder) => {						
	builder					
	.addCase(createAction(types.SET_INGREDIENTS), (state, action) => {					
		state.ingredients = action.payload				
	})
	.addCase(createAction(types.ADD_ONE_INGREDIENT_CHOICES), (state, action) => {					
		state.ingredientsChoices = [...state.ingredientsChoices, action.payload]				
	})
	.addCase(createAction(types.SET_INGREDIENTS_CHOICES), (state, action) => {					
		state.ingredientsChoices = action.payload				
	})
})						
						
export default ingredientsReducer;	
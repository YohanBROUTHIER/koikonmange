import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";
import types from "./types";

 

			
const initialState = {	
	validate: true,					
	favorites:[]		
}						
						
const favoritesReducer = createReducer (initialState, (builder) => {						
	builder					
	.addCase(createAction(types.SET_FAVORITES), (state, action) => {					
		state.favorites = action.payload				
	})
    .addCase(createAction(types.REMOVE_RECIPE_FROM_FAVORITES), (state, action) => {
        const recipeId = action.payload;
        state.favorites = state.favorites.filter((recipe) => recipe.id !== recipeId);
      });			
})						
						
export default favoritesReducer;						
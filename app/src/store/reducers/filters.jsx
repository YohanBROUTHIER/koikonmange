import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";
import types from "./types";


const initialState = {	
    filters: {
        hunger: [{name:"Copieux", state: false},{name:"Normal", state: false},{name:"Léger", state: false}],
        preparatingTime: {min:"00:00",max:"23:59"},
        cookingTime: {min:"00:00",max:"23:59"},
        dietPreferences: [{name:"Vegetarien", state: false}, {name:"Vegetalien", state: false}, {name:"Crudivore", state:false}, {name:"Sans gluten", state: false}, {name:"Sans lactose", state: false}],
        favoritesRecipes: {name:"Favoris", state:true},
    }					
}						
						
const filtersReducer = createReducer (initialState, (builder) => {						
	builder
    .addCase(createAction(types.SET_HUNGER_BIG), (state) => {					
		state.filters.hunger[0].state = !state.filters.hunger[0].state;				
	})
    .addCase(createAction(types.SET_HUNGER_NORMAL), (state) => {					
		state.filters.hunger[1].state = !state.filters.hunger[1].state;			
	})
    .addCase(createAction(types.SET_HUNGER_FEW), (state) => {					
		state.filters.hunger[2].state = !state.filters.hunger[2].state;				
	})
    .addCase(createAction(types.SET_PREPARATING_TIME), (state, action) => {					
		state.filters.preparatingTime = action.payload;
	})
    .addCase(createAction(types.SET_COOKING_TIME), (state, action) => {					
		state.filters.cookingTime = action.payload;	
	})
  .addCase(createAction(types.SET_FAVORITES_RECIPES), (state) => {					
		state.filters.favoritesRecipes.state = !state.filters.favoritesRecipes.state
	})

})						
						
export default filtersReducer;
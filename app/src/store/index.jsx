import favoritesReducer from "./reducers/favorites";
import sessionReducer from "./reducers/session";
import recipesReducer from "./reducers/recipes";			
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./reducers/filters";
import ingredientsReducer from "./reducers/ingredients";				
import familiesReducer from "./reducers/families";
import proposalReducer from "./reducers/proposal";
import unitReducer from "./reducers/unit";
import isAsideReducer from "./reducers/isAside";
import historyReducer from "./reducers/history";
				
const store = configureStore({				
	reducer: {
		favorites:favoritesReducer, 
		session:sessionReducer,
		recipes:recipesReducer, 
		filters:filtersReducer,
		ingredients:ingredientsReducer,
		families:familiesReducer,
		proposal:proposalReducer,
		history:historyReducer,
		units:unitReducer,
		isAside: isAsideReducer
	}			
})				
				
export default store;				
				
				
				
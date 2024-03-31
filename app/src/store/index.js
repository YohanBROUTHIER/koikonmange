		
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./reducers/filters";
import proposalReducer from "./reducers/proposal";

import { families, favorites, history, ingredients, recipes, session, units, styles} from "./reducers/index.js"

const store = configureStore({
  reducer: {
    families,
    favorites,
    history,
    ingredients,
    recipes,
    session,
    units,
    styles,
    
    filters:filtersReducer,
    proposal:proposalReducer
  }			
});

export default store;



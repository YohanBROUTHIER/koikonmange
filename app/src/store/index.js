import { configureStore } from "@reduxjs/toolkit";
import proposalReducer from "./reducers/proposal";

import { families, favorites, history, ingredients, recipes, session, units, styles, filters} from "./reducers/index.js";

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
    filters,

    proposal:proposalReducer
  }
});

export default store;



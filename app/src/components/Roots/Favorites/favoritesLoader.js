import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function favoritesLoader({request}){
    const {session} = store.getState();

    store.dispatch({type:types.SET_IS_ASIDE_TRUE});

    const url = new URL(request.url);

    const urlClient = url;
    // ,{recipe : [["userId","=",session.id]]}
    const query = mappingUrlFunction(urlClient); 

    async function fetchDataRecipesApi() {
      const recipes = await RecipeApi.getAll(query);
      store.dispatch({type:types.SET_RECIPES, payload: recipes})
      return recipes
    }
    await fetchDataRecipesApi()

    async function fetchDataFavoritesRecipesApi() {
      const favorites = await UserApi.getRecipeToUser(query, session.id);
      store.dispatch({type:types.SET_FAVORITES, payload: favorites})
      return favorites
    }
    

    async function fetchDataFamilyApi() {
        const families = await FamilyApi.getAll();
        store.dispatch({type:types.SET_FAMILIES, payload: families})
        return families 
      }
      await fetchDataFamilyApi()
  
      async function fetchDataIngredientApi() {
        const ingredients = await IngredientApi.getAll();
        store.dispatch({type:types.SET_INGREDIENTS, payload: ingredients})
        return ingredients
      }
      await fetchDataIngredientApi()

    return fetchDataFavoritesRecipesApi();
}
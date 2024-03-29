import { RecipeApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function recipeLoader({params}) {
    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    const recipe = await RecipeApi.get(params.id);
    return recipe;
  }
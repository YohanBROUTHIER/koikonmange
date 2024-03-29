import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../../api";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import store from "../../../store";
import types from "../../../store/reducers/types";

export async function proposalLoader({request}){
  store.dispatch({type:types.SET_IS_ASIDE_TRUE});
  
  const state = store.getState();
  const {session} = state;

  const urlClient = new URL(request.url);
  const query = mappingUrlFunction(urlClient);

  // store.dispatch({type:types.SET_RECIPES, payload: await RecipeApi.getAll(query)});
  // if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()});
  store.dispatch({type:types.SET_INGREDIENTS, payload:await IngredientApi.getAll()});
  if (session.isConnected) {
    const favorites = await UserApi.getRecipeToUser(null, session.id);
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
  }

  const params = new URLSearchParams(urlClient.search);
  const favoriteParam = params.get('favoritesRecipes');

  // /!\ faire le dispatch recipesProposal avant le dispatch generatedProposal
  // pas de useLoaderData() pour cette raison
  if (favoriteParam) {
    store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: await UserApi.getRecipeToUser(query, session.id)})
    if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  } else {
    store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: await RecipeApi.getAll(query)})
    if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  }

  return null
}
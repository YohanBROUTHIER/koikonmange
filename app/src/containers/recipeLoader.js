import { RecipeApi } from "../../../api";

export async function recipeLoader({params}) {
  const recipe = await RecipeApi.get(params.id);
  return recipe;
}
import { RecipeApi } from "../services/api";
import toast from "../utils/toast";
import store from "../store";
import { appError } from "../utils";
import { redirect } from "react-router-dom";

export default async function ({ request, params }) {
  const {session} = store.getState();

  if (session.id !== parseInt(params.userId)) {
    throw new appError("Forbiden",{httpStatus: 403});
  }

  switch (request.method) {
  case "PUT": 
    await RecipeApi.addToUser(params.recipeId, params.userId);
  
    toast.success("La recette est ajouté aux favoris");
    break;
  case "DELETE": 
    await RecipeApi.removeToUser(params.recipeId, params.userId);
  
    toast.success("La recette est retiré aux favoris");
    break;
  default:
    throw new Response("Invalide methode", { status: 405 });
  }
  return redirect("/recipe");
}
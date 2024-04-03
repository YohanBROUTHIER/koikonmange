import {  IngredientApi, RecipeApi } from "../services/api";
import toast from "../utils/toast";
import store from "../store";
import types from "../store/types";
import { minutesToTime, timeToMinutes } from "../utils";
import RecipeValidator from "../services/validators/recipeValidator.js";
import IngredientValidator from "../services/validators/ingredientValidator.js";
import { redirect } from "react-router-dom";

export default async function ({ request, params }) {
  const {session} = store.getState();
  const formData = await request.formData();
  let recipe = null;
  let recipeDB;
  let body;
  switch (request.method) {
  case "POST":
    recipe = formDataToRecipe(formData);
    body = {
      recipe: RecipeValidator.checkBodyForCreate(recipe, session),
      ingredients: recipe.ingredients?.map(ingredient => IngredientValidator.checkDataForCreateToRecipe(ingredient))
    };
      
    recipeDB = await RecipeApi.create(body.recipe);
  
    await Promise.all(body.ingredients?.map(async ingredient => {
      await IngredientApi.addIngredientToRecipe(recipeDB.id, ingredient);
    }));
  
    break;
  case "PATCH":
    recipe = formDataToRecipe(formData);
    recipeDB = store.getState().recipes?.find(recipeDB => recipeDB.id === recipe.id);
    body = {
      recipe: RecipeValidator.checkBodyForUpdate(recipe, session),
      ingredients: recipe.ingredients?.map(ingredient => IngredientValidator.checkDataForUpdateToRecipe(ingredient))
    };

    await Promise.all([
      async () => {
        if (Object.entries(body.recipe).some((key,value) => {
          return recipeDB[key] !== value;
        })) {
          recipeDB = await RecipeApi.create(body.recipe);
        }
        return;
      },
      ...body.ingredients.map(async ingredient => {
        await IngredientApi.addIngredientToRecipe(params.id, ingredient);
      })]
    );

    break;
  case "DELETE": 
    await RecipeApi.delete(params.id);
    store.dispatch({type:types.deleteRecipes, payload: params.id});
  
    toast.success("Suppression de la recette effectué avec succès.");
    return redirect("/recipes");
  default:
    throw new Response("Invalide methode", { status: 405 });
  
  }
  return {recipeDB};
}

function formDataToRecipe(data) {
  let recipe = {};
  for (let [key, value] of data.entries()) {
    if (value === "") {
      continue;
    }

    if (key === "ingredients") {
      if (!recipe[key]) recipe[key] = [];

      value.split("-").forEach(id => {
        const isContained = recipe[key].some(item => item.id == id);
        if (isContained) {
          return;
        }
        recipe[key].push({id});
      });

      continue;
    }

    if (key.match(/^([A-Za-z]+-){2}\d+$/)) {
      const [listName, propertyName, id] = key.split("-");
      if (!recipe[listName]) recipe[listName] = [];
      const isContained = recipe[listName].some(item => item.id == parseInt(id));
      if (isContained) {
        recipe[listName] = recipe[listName].map(element => {
          if (element.id != parseInt(id)) {
            return element;
          }
          let item = {};
          item[propertyName] = value;
          return {...element, ...item};
        });
        continue;
      }
      let item = {id};
      item[propertyName] = value;
      recipe[listName].push(item);

      continue;
    }

    if (key === "cookingTime" || key === "preparatingTime") {
      recipe[key] = value.slice(0,5);
      continue;
    }

    if (key === "steps") {
      if (!recipe[key]) recipe[key] = [];
      recipe[key].push(value);
      continue;
    }

    recipe[key] = value;
  }

  recipe.time = minutesToTime(timeToMinutes(recipe.preparatingTime) + timeToMinutes(recipe.cookingTime));
  return recipe;
}
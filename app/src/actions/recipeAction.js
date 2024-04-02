import {  IngredientApi, RecipeApi } from "../services/api";
import toast from "../utils/toast";
import store from "../store";
import types from "../store/types";

export default async function ({ request, params }) {
  const formData = await request.formData();
  let recipe = null;
  let recipeDB;
  switch (request.method) {
  case "PATCH": 
    recipe = formDataToRecipe(formData);
    console.log(recipe)
    // recipeDB = await RecipeApi.update(recipe);
    // await Promise.All(recipe.ingredients.map(async ingredient => {
    //   await IngredientApi.addIngredientToRecipe(recipeDB.id, ingredient);
    // }));
    break;
  case "POST":
    recipe = formDataToRecipe(formData);

    recipeDB = await RecipeApi.create(recipe);

    await Promise.All(recipe.ingredients.map(async ingredient => {
      await IngredientApi.addIngredientToRecipe(recipeDB.id, ingredient);
    }));

    break;
  case "DELETE": {
    await RecipeApi.delete(params.id);
    store.dispatch({type:types.deleteRecipes, payload: params.id});
  
    toast.success("Suppression de la recette effectué avec succès.");
    break;
  }
  default: {
    throw new Response("Invalide methode", { status: 405 });
  }
  
  }
}

function formDataToRecipe(data) {
  let recipe = {};
  for (let [key, value] of data.entries()) {
    if (value.match(/^(\d+-)+\d+$/)) {
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
      recipe[key] = value.slice(0,-3);
      continue;
    }
    recipe[key] = value;
  }
  return recipe;
}
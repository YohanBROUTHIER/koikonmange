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
  let fetch = {};
  switch (request.method) {
  case "POST":
    recipe = formDataToRecipe(formData);
    body = {
      recipe: RecipeValidator.checkBodyForCreate(recipe, session),
      ingredients: recipe.ingredients?.map(ingredient => IngredientValidator.checkDataForCreateToRecipe(ingredient))
    };
    recipeDB = await RecipeApi.create(body.recipe);
  
    await Promise.all(body.ingredients?.map(ingredient => 
      new Promise((resolve) => {
        resolve(IngredientApi.addIngredientToRecipe(recipeDB.id, ingredient));
      })
    ));

    toast.success("Ajout de la recette effectué avec succès.");
    return redirect("/recipes");
  case "PATCH":
    recipe = formDataToRecipe(formData);
    recipeDB = store.getState().recipes.find(recipeDB => recipeDB.id === parseInt(params.id));
    body = {
      recipe: RecipeValidator.checkBodyForUpdate(recipe, session),
      ingredients: recipe.ingredients?.map(ingredient => IngredientValidator.checkDataForUpdateToRecipe(ingredient))
    };
    
    fetch.updateRecipe = new Promise((resolve) => {
      if (recipeDB) {
        const isModified = Object.entries(body.recipe).some((key,value) => recipeDB[key] !== value);
        if (isModified) {
          return resolve(RecipeApi.update(params.id,body.recipe));
        }
      }
      resolve();
    });

    fetch.addOrUpdateIngredients = body.ingredients ? Promise.all(body.ingredients.map(ingredient =>
      new Promise((resolve) => {
        const ingredientDB = recipeDB.ingredients ? recipeDB.ingredients.find(ingredientDB => ingredientDB.id === parseInt(ingredient.id)) : null;
        if (!ingredientDB) {
          return resolve(IngredientApi.addIngredientToRecipe(params.id, ingredient));
        }
        const isUpdated = Object.entries(ingredient).some((key,value) => ingredientDB[key] !== value);
        if (isUpdated) {
          return resolve(IngredientApi.updateIngredientToRecipe(params.id, ingredient));
        }
        resolve();
      })
    )) : Promise.resolve();

    fetch.removeIngredients = recipeDB.ingredients ? Promise.all(recipeDB.ingredients.map(ingredientDB =>
      new Promise((resolve) => {
        const isRemoved = !recipeDB.ingredients.some(ingredient => ingredientDB.id === ingredient.id);
        if (isRemoved) {
          return resolve(IngredientApi.removeIngredientToRecipe(params.id, ingredientDB.id));
        }
        resolve();
      })
    )) : Promise.resolve();

    await Promise.all([
      fetch.updateRecipe,
      fetch.addOrUpdateIngredients,
      fetch.removeIngredients
    ]);

    toast.success("modification de la recette effectué avec succès.");
    return redirect("/recipes");
  case "DELETE": 
    await RecipeApi.delete(params.id);
    store.dispatch({type:types.deleteRecipes, payload: params.id});
  
    toast.success("Suppression de la recette effectué avec succès.");
    return redirect("/recipes");
  default:
    throw new Response("Invalide methode", { status: 405 });
  }
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
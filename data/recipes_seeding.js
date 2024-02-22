/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { readFile } from 'node:fs/promises';
import cluster from "cluster";
import os from "node:os";

import '../src/helpers/envLoad.js';
import RecipeDatamapper from '../src/datamappers/recipe.datamapper.js';
import IngredientDatamapper from '../src/datamappers/ingredient.datamapper.js';
import FamilyDatamapper from '../src/datamappers/family.datamapper.js';
import UnitDatamapper from '../src/datamappers/unit.datamapper.js';

if (cluster.isPrimary) {
  const recipesJson = await readFile(new URL("./recipes.json", import.meta.url));
  const recipesFromJson = JSON.parse(recipesJson);

  const numCpu = os.cpus().length;
  const numThread = numCpu >= 4 ? 4 : numCpu;
  let endingThread = 0;

  const data = {
    families: null,
    ingredients: null,
    units: null,
    recipes: null,
    familiesDB:null,
    ingredientsDB:null,
    unitsDB:null,
    recipesDB:null,
    addFamiliesToIngredients:null,
    addIngredientsToRecipes:null,

  };

  console.log(`Master en fonctionnement avec ${numThread} threads`);
  console.time("Seeding de recettes.");

  // Créer des workers
  for (let i = 0; i < numThread; i++) {
    const worker = cluster.fork();  
  }

  cluster.on("message", (worker, message) => {
    if (message.task === "ready") {
      console.log(`Worker ${worker.id} is ready`);
    }

    if (message.task === "result") {
      Object.entries(message.payload).forEach(([key,value]) => {
        console.log(`Worker ${worker.id} computed result:`, key);
        data[key] = value;
      });
    }
    
    if (!data.ingredients) {
      data.ingredients = "in progress";
      return worker.send({ task: "find_ingredients", payload: recipesFromJson });
    }
    if (!data.families) {
      data.families = "in progress";
      return worker.send({ task: "find_families", payload: recipesFromJson });
    }
    if (!data.units) {
      data.units = "in progress";
      return worker.send({ task: "find_units", payload: recipesFromJson });
    }
    if (!data.recipes) {
      data.recipes = "in progress";
      return worker.send({ task: "find_recipes", payload: recipesFromJson });
    }

    if (!data.familiesDB && data.families && data.families !== "in progress") {
      data.familiesDB = "in progress";
      return worker.send({ task: "create_families", payload: data.families });
    }
    if (!data.ingredientsDB && data.ingredients && data.ingredients !== "in progress") {
      data.ingredientsDB = "in progress";
      return worker.send({ task: "create_ingredients", payload: data.ingredients });
    }
    if (!data.unitsDB && data.units && data.units !== "in progress") {
      data.unitsDB = "in progress";
      return worker.send({ task: "create_units", payload: data.units });
    }
    if (!data.recipesDB && data.recipes && data.recipes !== "in progress") {
      data.recipesDB = "in progress";
      return worker.send({ task: "create_recipes", payload: data.recipes });
    }

    if (!data.addFamiliesToIngredients && data.familiesDB && data.familiesDB !== "in progress" && data.ingredientsDB && data.ingredientsDB !== "in progress") {
      data.addFamiliesToIngredients = "in progress";
      const payload = {familiesDB: data.familiesDB, ingredients: data.ingredients, ingredientsDB: data.ingredientsDB};
      return worker.send({ task: "add_families_to_ingredients", payload });
    }
    if (!data.addIngredientsToRecipes && data.ingredientsDB && data.ingredientsDB !== "in progress" && data.recipesDB && data.recipesDB !== "in progress" && data.unitsDB && data.unitsDB !== "in progress") {
      data.addIngredientsToRecipes = "in progress";
      const payload = {ingredientsDB: data.ingredientsDB, recipes: data.recipes, recipesDB: data.recipesDB, unitsDB: data.unitsDB};
      return worker.send({ task: "add_ingredients_to_recipes", payload });
    }

    console.log(`Worker ${worker.id} end`);
    endingThread++;
    if (endingThread === numThread) {
      console.timeEnd("Seeding de recettes.");
      process.exit();
    }

  });

} else {
  // Code pour les processus enfants
  process.send({task: "ready", pid:process.pid});

  // Recevoir les messages du processus principal
  process.on("message", async (message) => {
    let payload;
    if (message.task === "find_families") {
      payload = {families:findFamilies(message.payload)};
    }
    if (message.task === "create_families") {
      const familiesDB = await seedFamilies(message.payload);
      payload = {familiesDB};
    }
    if (message.task === "find_ingredients") {
      payload = {ingredients:findIngredients(message.payload)};
    }
    if (message.task === "create_ingredients") {
      const ingredientsDB = await seedIngredients(message.payload);
      payload = {ingredientsDB};
    }
    if (message.task === "find_units") {
      payload = {units:findUnits(message.payload)};
    }
    if (message.task === "create_units") {
      const unitsDB = await seedUnits(message.payload);
      payload = {unitsDB};
    }
    if (message.task === "find_recipes") {
      payload = {recipes:findRecipes(message.payload)};
    }
    if (message.task === "create_recipes") {
      const recipesDB = await seedRecipes(message.payload);
      payload = {recipesDB};
    }
    if (message.task === "add_families_to_ingredients") {
      const result = await addFamiliesToIngredients(message.payload);
      payload = {addFamiliesToIngredients: result};
    }
    if (message.task === "add_ingredients_to_recipes") {
      const result = await addIngredientsToRecipes(message.payload);
      payload = {addIngredientsToRecipes: result};
    }

    if (payload) {
      process.send({ task: 'result', payload });      
    }
  });
}



function findFamilies(data) {
  let allFamilies = [];

  data.forEach(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const {families, ...ingredient} = extendIngredient;
      
      families.forEach(async family =>{
        const isExist = allFamilies.some(element => element.name === family.name);
        if (isExist) {
          return;
        }
        allFamilies.push(family);
      });
    });
  });

  return allFamilies;
}
function findIngredients(data) {
  let allIngredients = [];

  data.forEach(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const isExist = allIngredients.some(ingredient => ingredient.name === extendIngredient.name);
      if (isExist) {
        return;
      }
      allIngredients.push(extendIngredient);
    });
  });

  return allIngredients;
}
function findUnits(data) {
  let allUnits = [];

  data.forEach(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const isExist = allUnits.some(unit => unit.name === extendIngredient.unit);
      if (isExist) {
        return;
      }
      allUnits.push({name: extendIngredient.unit});
    });
  });

  return allUnits;
}
function findRecipes(data) {
  let allRecipes = [];

  data.forEach(async extendRecipe =>{
    const isExist = allRecipes.some(recipe => recipe.name === extendRecipe.name);
      if (isExist) {
        return;
      }
      allRecipes.push(extendRecipe);
    
  });

  return allRecipes;
}

async function seedFamilies(families) {
  return await Promise.all(families.map(async family => await FamilyDatamapper.create(family)));
}
async function seedIngredients(ingredients) {
  return await Promise.all(ingredients.map(async ingredient => await IngredientDatamapper.create(ingredient)));
}
async function seedUnits(units) {
  return await Promise.all(units.filter(unit => unit.name !== null).map(async unit => await UnitDatamapper.create(unit)));
}
async function seedRecipes(recipes) {
  return await Promise.all(recipes.map(async recipe => await RecipeDatamapper.create(recipe)));
}
async function addFamiliesToIngredients({familiesDB, ingredients, ingredientsDB}) {
  return await Promise.all(ingredients.map(async ingredient => {
    const ingredientId = ingredientsDB.find(ingredientDB => ingredientDB.name === ingredient.name).id;

    return Promise.all(ingredient.families.map(async family => {
      const familyId = familiesDB.find(familyDB => familyDB.name === family.name).id;
      return await FamilyDatamapper.addToIngredient({ingredientId, familyId});
    }));
  }));
}
async function addIngredientsToRecipes({ingredientsDB, recipes, recipesDB , unitsDB}) {
  return await Promise.all(recipes.map(async recipe => {
    const recipeId = recipesDB.find(recipeDB => recipeDB.name === recipe.name).id;
    return Promise.all(recipe.ingredients.map(async ingredient => {
      const ingredientId = ingredientsDB.find(ingredientDB => ingredientDB.name === ingredient.name).id;
      let unitId = null;
      if (ingredient.unit) {
        unitId = unitsDB.find(unitDB => unitDB.name === ingredient.unit).id;
      }
      return await await IngredientDatamapper.addToRecipe({ingredientId, recipeId , unitId, quantity: ingredient.quantity});
    }));
  }));
}

import { readFile } from 'node:fs/promises';

import '../src/helpers/envLoad.js';
import RecipeDatamapper from '../src/datamappers/recipe.datamapper.js';
import IngredientDatamapper from '../src/datamappers/ingredient.datamapper.js';
import FamilyDatamapper from '../src/datamappers/family.datamapper.js';

const recipesJson = await readFile(new URL("./recipes.json", import.meta.url));
const recipesFromJson = JSON.parse(recipesJson);

console.log(recipesFromJson);
await Promise.all(recipesFromJson.map(async extendRecipe =>{
  const {ingredients, ...recipe} = extendRecipe;
  await RecipeDatamapper.create(recipe);

  return await Promise.all(ingredients.map(async extendIngredient =>{
    const {families, ...ingredient} = extendIngredient;
    await IngredientDatamapper.create(ingredient);

    return await Promise.all(families.map(async family =>{
      let familyDb = await FamilyDatamapper.findAll({filter:{family:[["name","=",family.name]]}});
      if (!familyDb) {
        familyDb = await FamilyDatamapper.create(family);
      }
      
      
    }));
  }));
}));
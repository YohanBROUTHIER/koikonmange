import { readFile } from 'node:fs/promises';

import '../src/helpers/envLoad.js';
import RecipeDatamapper from '../src/datamappers/recipe.datamapper.js';
import IngredientDatamapper from '../src/datamappers/ingredient.datamapper.js';
import FamilyDatamapper from '../src/datamappers/family.datamapper.js';
import UnitDatamapper from '../src/datamappers/unit.datamapper.js';

const recipesJson = await readFile(new URL("./recipes.json", import.meta.url));
const recipesFromJson = JSON.parse(recipesJson);

await Promise.all(recipesFromJson.map(async extendRecipe =>{
  const {ingredients, ...recipe} = extendRecipe;
  let [ recipDb ] = await RecipeDatamapper.findAll({filter:{recipe:[["name","=",recipe.name]]}});
  if (recipDb) {
    return;
  }
  recipDb = await RecipeDatamapper.create(recipe);

  // Add ingredients to family if not already exist
  return await Promise.all(ingredients.map(async extendIngredient =>{
    const {families, ...ingredient} = extendIngredient;
    let [ ingredientDb ] = await IngredientDatamapper.findAll({filter:{ingredient:[["name","=",ingredient.name]]}});
    if (!ingredientDb) {
      try {
        ingredientDb = await IngredientDatamapper.create(ingredient);        
      } catch (error) {
        [ ingredientDb ] = await IngredientDatamapper.findAll({filter:{ingredient:[["name","=",ingredient.name]]}});
      }
    }

    // Create unit if not already exist
    let recipeHasIngredient = await IngredientDatamapper.findIngredientToRecipe({filter:{"recipe_has_ingredient":[["ingredientId","=",ingredientDb.id],["recipeId","=",recipDb.id]]}});
    if (!recipeHasIngredient) {
      let unitDb = {id:null};
      if (ingredient.unit) {
        [ unitDb ] = await UnitDatamapper.findAll({filter:{unit:[["name","=",ingredient.unit]]}});
        if (!unitDb) {
          try {
            unitDb = await UnitDatamapper.create({name: ingredient.unit});            
          } catch (error) {
            [ unitDb ] = await UnitDatamapper.findAll({filter:{unit:[["name","=",ingredient.unit]]}});
          }
        }
      }
      recipeHasIngredient = await IngredientDatamapper.addToRecipe({ingredientId: ingredientDb.id, recipeId: recipDb.id , unitId: unitDb.id, quantity: ingredient.quantity});
    }
    
    // Add families to ingredient if not already exist
    return await Promise.all(families.map(async family =>{
      // Create family if not already exist
      let [ familyDb ] = await FamilyDatamapper.findAll({filter:{family:[["name","=",family.name]]}});
      if (!familyDb) {
        try {
          familyDb = await FamilyDatamapper.create(family);          
        } catch (error) {
          [ familyDb ] = await FamilyDatamapper.findAll({filter:{family:[["name","=",family.name]]}});
        }
      }
      const ingredientHasFamily = await FamilyDatamapper.findFamilyToIngredient({filter:{"ingredient_has_family":[["familyId","=",familyDb.id],["ingredientId","=",ingredientDb.id]]}});
      if (ingredientHasFamily) {
        return;
      }
      try {
        await FamilyDatamapper.addToIngredient({ingredientId: ingredientDb.id, familyId: familyDb.id});        
      } catch (error) {
        // console.log(`Erreur d'ajout de la famille ${familyDb.name} à l'ingredient ${ingredientDb.name}.`);
      }
      return;
    }));
  }));
}));

console.log("End of seeding");
process.exit();
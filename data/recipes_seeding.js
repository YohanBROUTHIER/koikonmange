import { readFile } from 'node:fs/promises';
import cluster from "cluster";
import os from "node:os";

import '../src/helpers/envLoad.js';
import RecipeDatamapper from '../src/datamappers/recipe.datamapper.js';
import IngredientDatamapper from '../src/datamappers/ingredient.datamapper.js';
import FamilyDatamapper from '../src/datamappers/family.datamapper.js';
import UnitDatamapper from '../src/datamappers/unit.datamapper.js';

const recipesJson = await readFile(new URL("./recipes.json", import.meta.url));
const recipesFromJson = JSON.parse(recipesJson);

const numCpu = os.cpus().length;
const numThread = recipesFromJson.length > 4 * numCpu ? numCpu : 1 ;

if (cluster.isPrimary) {
  let workerTaskEnd = 0;
  console.log(`Master en fonctionnement avec ${numThread} threads`);
  console.time('Début du seeding de recettes.');

  // Créer des workers
  for (let i = 0; i < numThread; i++) {
    const worker = cluster.fork();  
  }

  cluster.on('message', (worker, message) => {
    if (message.task === 'ready') {
      console.log(`Worker ${worker.id} is ready`);
      worker.send({
        task: 'compute',
        data: {
          min: Math.floor((worker.id - 1) * recipesFromJson.length / numThread),
          max: Math.floor(worker.id * recipesFromJson.length / numThread)}
      });
    }

    if (message.task === 'result') {
      console.log(`Worker ${worker.id} computed result:`, message.result);
      workerTaskEnd++;

      if (workerTaskEnd === numThread) {
        console.timeEnd('End of seeding');
        process.exit();
      }
    }

  });



} else {
  // Code pour les processus enfants

  process.send({task: "ready", pid:process.pid});

  // Recevoir les messages du processus principal
  process.on('message', async (message) => {
    if (message.task === 'compute') {
      // Effectuer le calcul dans le worker
      await batchSeedData(message.data);
      // Envoyer le résultat au processus principal
      process.send({ task: 'result', result:"Terminé" });
    }
  });
}


async function batchSeedData({min,max}) {
  const batchData = recipesFromJson.slice(min,max);
  await seedData(batchData);
}


async function seedData(data) {
  await Promise.all(data.map(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    let [ recipDb ] = await RecipeDatamapper.findAll({filter:{recipe:[["name","=",recipe.name]]}});
    if (!recipDb) {
      try {
        recipDb = await RecipeDatamapper.create(recipe);
      } catch (error) {
        [ recipDb ] = await RecipeDatamapper.findAll({filter:{recipe:[["name","=",recipe.name]]}});
      }
    }
  
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
        try {
          recipeHasIngredient = await IngredientDatamapper.addToRecipe({ingredientId: ingredientDb.id, recipeId: recipDb.id , unitId: unitDb.id, quantity: ingredient.quantity});
        } catch (error) {
          return;
        }
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
}
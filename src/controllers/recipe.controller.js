import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../validators/recipe.validator.js';

export default class RecipeController extends CoreController {
  static datamapper = RecipeDatamapper;
  static className = 'Recipe';
  static validator = RecipeValidator;

  static async addToUser(req, res) {
    const {recipeId, userId} = req.params;

    this.validator.checkId(userId);
    this.validator.checkId(recipeId);

    const existingRecipe = await RecipeDatamapper.findByPk(recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    const existingUser = await this.datamapper.findByPk(userId);
    this.validator.checkIfExist(existingUser, "User");

    await this.datamapper.addToUser({userId, recipeId});

    return res.status(200).end();
  }
  static async removeToUser(req, res) {
    const {recipeId, userId} = req.params;

    this.validator.checkId(userId);
    this.validator.checkId(recipeId);

    const existingRecipe = await RecipeDatamapper.findByPk(recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    const existingUser = await this.datamapper.findByPk(userId);
    this.validator.checkIfExist(existingUser, "User");

    await this.datamapper.removeToUser({userId, recipeId});

    return res.status(200).end();
  }
}

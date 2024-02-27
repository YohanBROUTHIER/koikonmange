import IngredientDatamapper from "../datamappers/ingredient.datamapper.js";
import RecipeDatamapper from "../datamappers/recipe.datamapper.js";
import UnitDatamapper from "../datamappers/unit.datamapper.js";
import IngredientValidator from "../validators/ingredient.validator.js";
import CoreController from "./core.controller.js";

export default class IngredientController extends CoreController{
  static datamapper = IngredientDatamapper;
  static className = "ingredient";
  static validator = IngredientValidator;

  static async addToRecipe(req, res) {
    const data = this.validator.checkDataForCreateToRecipe({ ...req.body, ...req.params});

    if (data.unitId) {
      const existingUnit = await UnitDatamapper.findByPk(data.unitId);
      this.validator.checkIfExist(existingUnit, "Unit");
    }

    const existingIngredient = await this.datamapper.findByPk(data.ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingRecipe = await RecipeDatamapper.findByPk(data.recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    await this.datamapper.addToRecipe(data);

    return res.status(200).end();
  }
  static async updateToRecipe(req, res) {
    const data = this.validator.checkDataForUpdateToRecipe({ ...req.body, ...req.params});

    if (data.unitId) {
      const existingUnit = await UnitDatamapper.findByPk(data.unitId);
      this.validator.checkIfExist(existingUnit, "Unit");
    }

    const existingIngredient = await this.datamapper.findByPk(data.ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingRecipe = await RecipeDatamapper.findByPk(data.recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    await this.datamapper.updateToRecipe(data);

    return res.status(200).end();
  }
  static async removeToRecipe(req, res) {
    const {ingredientId, recipeId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(recipeId);

    const existingIngredient = await this.datamapper.findByPk(ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingRecipe = await RecipeDatamapper.findByPk(recipeId);
    this.validator.checkIfExist(existingRecipe, "Recipe");

    await this.datamapper.removeToRecipe({ingredientId, recipeId});

    return res.status(200).end();
  }
}

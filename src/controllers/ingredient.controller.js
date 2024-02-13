import IngredientDatamapper from "../datamappers/ingredient.datamapper";
import IngredientValidator from "../helpers/validators/ingredient.validator";
import CoreController from "./core.controller";

export default class IngredientController extends CoreController{
  static datamapper = IngredientDatamapper;
  static className = "ingredient";
  static validator = IngredientValidator;

  static async addFamily(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(familyId);

    const existingIngredient = await this.datamapper.findByPk(ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingFamily = await this.datamapper.findByPk(familyId);
    this.validator.checkIfExist(existingFamily, "Family");

    await this.datamapper.addFamily({ingredientId, familyId});

    return res.status(200).end();
  }
  static async removeFamily(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(familyId);

    const existingIngredient = await this.datamapper.findByPk(ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingFamily = await this.datamapper.findByPk(familyId);
    this.validator.checkIfExist(existingFamily, "Family");

    await this.datamapper.removeFamily({ingredientId, familyId});

    return res.status(200).end();
  }
}

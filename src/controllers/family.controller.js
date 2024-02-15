import CoreController from './core.controller.js';
import FamilyDatamapper from '../datamappers/family.datamapper.js';  
import FamilyValidator from '../helpers/validators/family.validator.js';
import IngredientDatamapper from '../datamappers/ingredient.datamapper.js';

export default class FamilyController extends CoreController {
  static datamapper = FamilyDatamapper;
  static className = 'Family';
  static validator = FamilyValidator;

  static async addToIngredient(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(familyId);

    const existingIngredientInFamily = await this.datamapper.findFamilyToIngredient({where:[{name:"ingredientId",operator:"=",value:ingredientId},{name:"familyId",operator:"=",value:familyId}]});
    this.validator.checkIfAlreadyExist(existingIngredientInFamily, "This ingredient in family");

    const existingIngredient = await IngredientDatamapper.findByPk(ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingFamily = await this.datamapper.findByPk(familyId);
    this.validator.checkIfExist(existingFamily, "Family");

    await this.datamapper.addToRecipe({ingredientId, familyId});

    return res.status(200).end();
  }
  static async removeToIngredient(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(familyId);

    const existingIngredientInFamily = await this.datamapper.findFamilyToIngredient({where:[{name:"ingredientId",operator:"=",value:ingredientId},{name:"familyId",operator:"=",value:familyId}]});
    this.validator.checkIfExist(existingIngredientInFamily, "This ingredient in family");

    await this.datamapper.removeToRecipe({ingredientId, familyId});

    return res.status(200).end();
  }
}

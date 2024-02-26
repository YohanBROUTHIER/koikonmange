import CoreController from './core.controller.js';
import FamilyDatamapper from '../datamappers/family.datamapper.js';  
import FamilyValidator from '../validators/family.validator.js';
import IngredientDatamapper from '../datamappers/ingredient.datamapper.js';

export default class FamilyController extends CoreController {
  static datamapper = FamilyDatamapper;
  static className = 'Family';
  static validator = FamilyValidator;

  static async addToIngredient(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId, "ingredientId");
    this.validator.checkId(familyId, "familyId");

    const existingIngredientInFamily = await this.datamapper.findFamilyToIngredient({filter:{family:[["ingredientId","=",ingredientId],["familyId","=",familyId]]}});
    this.validator.checkIfAlreadyExist(existingIngredientInFamily, "This ingredient in family");

    const existingIngredient = await IngredientDatamapper.findByPk(ingredientId);
    this.validator.checkIfExist(existingIngredient, "Ingredient");

    const existingFamily = await this.datamapper.findByPk(familyId);
    this.validator.checkIfExist(existingFamily, "Family");

    await this.datamapper.addToIngredient({ingredientId, familyId});

    return res.status(200).end();
  }
  static async removeToIngredient(req, res) {
    const {ingredientId, familyId} = req.params;

    this.validator.checkId(ingredientId);
    this.validator.checkId(familyId);

    const existingIngredientInFamily = await this.datamapper.findFamilyToIngredient({filter:{family:[["ingredientId","=",ingredientId],["familyId","=",familyId]]}});
    this.validator.checkIfExist(existingIngredientInFamily, "This ingredient in family");

    await this.datamapper.removeToIngredient({ingredientId, familyId});

    return res.status(200).end();
  }
}

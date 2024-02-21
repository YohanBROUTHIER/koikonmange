import CoreController from './core.controller.js';
import RecipeDatamapper from '../datamappers/recipe.datamapper.js';
import RecipeValidator from '../validators/recipe.validator.js';

export default class RecipeController extends CoreController {
  static datamapper = RecipeDatamapper;
  static className = 'Recipe';
  static validator = RecipeValidator;
}

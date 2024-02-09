import CoreController from './core.controller.js';
import FamilyDatamapper from '../datamappers/family.datamapper.js';  
import FamilyValidator from '../helpers/validators/family.validator.js';

export default class FamilyController extends CoreController {
  static datamapper = FamilyDatamapper;
  static className = 'Family';
  static validator = FamilyValidator;
}

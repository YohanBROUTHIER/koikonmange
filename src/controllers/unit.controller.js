import CoreController from './core.controller.js';
import UnitDatamapper from '../datamappers/unit.datamapper.js';
import UnitValidator from '../validators/unit.validator.js';

export default class UnitController extends CoreController {
  static datamapper = UnitDatamapper;
  static className = 'Unit';
  static validator = UnitValidator;
}

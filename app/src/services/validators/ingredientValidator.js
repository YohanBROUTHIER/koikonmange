import AppError from "../../utils/appError.js";
import CoreValidator from './coreValidator.js';

export default class IngredientValidator extends CoreValidator{
  static checkBodyForCreate({ name, image }) {
    if (!name) {
      throw new AppError("Name are required for creating a family", { httpStatus: 400 });
    }
    if (!String(name).match(/^[A-Za-z -]+$/)) {
      throw new AppError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    }
    if (image && !String(image).match(/^\/images\/[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}\..{3,4}$/)) {
      throw new AppError("Invalid image link.", { httpStatus: 400 });
    }

    return { name, image };
  }
  static checkBodyForUpdate({ name, image }) {
    if (name && !String(name).match(/^[A-Za-z -]+$/)) {
      throw new AppError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    }
    if (image && !String(image).match(/^\/images\/[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}\..{3,4}$/)) {
      throw new AppError("Invalid image link.", { httpStatus: 400 });
    }

    return { name, image };
  }
  static checkDataForCreateToRecipe({ quantity, unitId, id }) {
    this.checkId(id, "ingredientId");
    if (unitId) {
      this.checkId(unitId, "unitId");      
    }
    if (quantity && !String(quantity).match(/^\d+(,\d+|.\d+)?$/)) {
      throw new AppError("Quantity should be a number", { httpStatus: 400 });
    }

    return { quantity, unitId, id };
  }
  static checkDataForUpdateToRecipe({ quantity, unitId, id }) {
    this.checkId(id, "ingredientId");
    if (unitId) {
      this.checkId(unitId, "unitId");
    }
    if (quantity && !String(quantity).match(/^\d+(,\d+|.\d+)?$/)) {
      throw new AppError("Quantity should be a number", { httpStatus: 400 });
    }

    return { quantity, unitId, id };
  }
}
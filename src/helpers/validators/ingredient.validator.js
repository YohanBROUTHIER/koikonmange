import ApiError from '../apiError.js';
import CoreValidator from './core.validator.js';

export default class IngredientValidator extends CoreValidator{
  static checkBodyForCreate({ name, image }) {
    if (!name) {
      throw new ApiError("Name are required for creating a family", { httpStatus: 400 });
    }
    if (!String(name).match(/^[A-Za-z -]+$/)) {
      throw new ApiError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    }
    if (image && !String(image).match(/^\/images\/[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}\..{3,4}$/)) {
      throw new ApiError("Invalid image link.", { httpStatus: 400 });
    }

    return { name, image };
  }

  static checkBodyForUpdate({ name, image }) {
    if (name && !String(name).match(/^[A-Za-z -]+$/)) {
      throw new ApiError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    }
    if (image && !String(image).match(/^\/images\/[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}\..{3,4}$/)) {
      throw new ApiError("Invalid image link.", { httpStatus: 400 });
    }

    return { name, image };
  }
}
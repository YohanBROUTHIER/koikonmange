import ApiError from '../helpers/apiError.js';
import CoreValidator from './core.validator.js';

export default class FamilyValidator extends CoreValidator{
  static checkBodyForCreate(body) {
    const { name } = body;

    if (!name) {
      throw new ApiError("Name are required for creating a family", { httpStatus: 400 });
    }


    // if (!name.match(/^[A-Za-z -]+$/)) {
    //   throw new ApiError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    // }

    return { name };
  }

  static checkBodyForUpdate(body) {

    const { name, description } = body;

    if (!name && !description) {
      throw new ApiError("At least one of name or description is required for updating a family", { httpStatus: 400 });
    }

    if (name && name.length < 3) {
      throw new ApiError("Family name should be at least three characters long during update", { httpStatus: 400 });
    }
    
    return { name, description };
  }
}
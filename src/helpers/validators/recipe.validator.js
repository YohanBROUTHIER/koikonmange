import ApiError from '../../helpers/apiError.js';
import CoreValidator from './core.validator.js';

export default class RecipeValidator extends CoreValidator {
  

  static checkBodyForCreate(body) {
    const { name, hunger, preparating_time, user_id } = body;

    if (!name || !hunger || !preparating_time || !user_id) {
      throw new ApiError("Name, hunger, preparating_time, and user_id are required for creating a recipe", { httpStatus: 400 });
    }

    

    return { name, hunger, preparating_time, user_id };
  }

  static checkBodyForUpdate(body) {
    
    
    //we need to check if at least one property for update is provided

    const { name, hunger, preparating_time, user_id } = body;

    if (!name && !hunger && !preparating_time && !user_id) {
      throw new ApiError("At least one property (name, hunger, preparating_time, user_id) is required for updating a recipe", { httpStatus: 400 });
    }

    return { name, hunger, preparating_time, user_id };
  }
}

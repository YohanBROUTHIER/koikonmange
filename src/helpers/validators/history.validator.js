import CoreValidator from "./core.validator.js";
import ApiError from "../apiError.js";

export default class HistoryValidator extends CoreValidator {
  static checkBodyForCreate({userId}) {
    this.checkId(userId);
    return {userId};
  }
  
  static checkBodyForAddRecype({validate, historyId, recipeId}) {
    this.checkId(historyId);
    this.checkId(recipeId);
   
    return {validate: !!validate, historyId, recipeId};
  }

  static checkBodyForUpdateRecype({validate, historyId, recipeId}) {
    if (validate === undefined) {
      throw new ApiError("Please add validate property in the body.", {httpStatus:404});
    }
    this.checkId(historyId);
    this.checkId(recipeId);
    
    return {validate: !!validate, historyId, recipeId};
  }

  static checkBodyForRemoveRecype({historyId, recipeId}) {
    this.checkId(historyId);
    this.checkId(recipeId);
    
   
    return {historyId, recipeId};
  }

}

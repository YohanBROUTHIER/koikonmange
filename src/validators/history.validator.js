import CoreValidator from "./core.validator.js";
import ApiError from "../helpers/apiError.js";

export default class HistoryValidator extends CoreValidator {
  static checkBodyForCreate({userId}) {
    this.checkId(userId);
    return {userId};
  }
  
  static checkDataForAddRecype({validate, historyId, recipeId}) {
    this.checkId(historyId, "historiId");
    this.checkId(recipeId, "recipeId");
   
    return {validate: !!validate, historyId, recipeId};
  }

  static checkDataForUpdateRecype({validate, historyId, recipeId}) {
    if (validate === undefined) {
      throw new ApiError("Please add validate property in the body.", {httpStatus:404});
    }
    this.checkId(historyId, "historiId");
    this.checkId(recipeId, "recipeId");
    
    return {validate: !!validate, historyId, recipeId};
  }

  static checkDataForRemoveRecype({historyId, recipeId}) {
    this.checkId(historyId);
    this.checkId(recipeId);
    
   
    return {historyId, recipeId};
  }

}

import CoreValidator from "./core.validator.js";
import ApiError from "../apiError.js";

export default class HistoryValidator extends CoreValidator {
  static checkBodyForCreate({user_id}) {
    this.checkId(user_id);
    return {user_id};
  }
  
  static checkBodyForAddRecype({validate, history_id, recipe_id}) {
    this.checkId(history_id);
    this.checkId(recipe_id);
   
    return {validate: !!validate, history_id, recipe_id}
  }

  static checkBodyForUpdateRecype({history_id, recipe_id}) {
    this.checkId(history_id);
    this.checkId(recipe_id);
    
   
    return {history_id, recipe_id, updated_at}
  }

  static checkBodyForRemoveRecype({history_id, recipe_id}) {
    this.checkId(history_id);
    this.checkId(recipe_id);
    
   
    return {history_id, recipe_id, delete_at}
  }

}

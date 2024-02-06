import CoreValidator from "./core.validator.js";
import ApiError from "../apiError.js";

export default class HistoryValidator extends CoreValidator {
  
    static checkId(id) {
      if (!id.match(/^[1-9]\d*$/)) {
        throw new ApiError("ID should be an integer", { httpStatus: 400 });
      }
    }
    

    static checkIfHistoryExist(data, dataName) {
        if (!data) {
          throw new ApiError(`${dataName} not found.`, { httpStatus: 404 });
        }
      }
  


}

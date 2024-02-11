import ApiError from "../apiError.js";

export default class CoreValidator {
  static checkId(id) {
    if ( !String(id).match(/^[1-9]\d*$/) ) {
      throw new ApiError("ID should be a valid integer", {httpStatus:400});
    }
  }

  static checkIfExist(data, dataName) {
    if (!data) {
      throw new ApiError(`${dataName} not found.`, {httpStatus:404});
    }
  }

  static checkValidity(data, dataName) {
    const dataDate = new Date(data).parse();
    const date = new Date().parse();

    if (dataDate > date) {
      throw new ApiError(`${dataName} is not valide`, {httpStatus:403});
    }
  }
}
import ApiError from "../apiError.js";

export default class CoreValidator {
  static checkId(id, idName) {
    if (!id || !String(id).match(/^[1-9]\d*$/)) {
      throw new ApiError(`${idName || "Id"} should be a valid integer`, {httpStatus:400});
    }
  }
  static checkIfExist(data, dataName) {
    if (!data) {
      throw new ApiError(`${dataName} not found.`, {httpStatus:404});
    }
  }
  static checkIfAlreadyExist(data, dataName) {
    if (data) {
      throw new ApiError(`${dataName} is already exist.`, {httpStatus:404});
    }
  }
  static checkValidity(data, dataName) {
    const dataDate = new Date(data).getTime();
    const date = new Date().getTime();

    if (dataDate > date) {
      throw new ApiError(`${dataName} is not valide`, {httpStatus:403});
    }
  }
}
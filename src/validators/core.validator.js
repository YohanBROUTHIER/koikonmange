import ApiError from "../helpers/apiError.js";

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
      throw new ApiError(`${dataName} is already exist.`, {httpStatus:400});
    }
  }
  static checkValidity(data, dataName) {
    const dataDate = new Date(data).getTime();
    const date = new Date().getTime();

    if (dataDate > date) {
      throw new ApiError(`${dataName} is not valid`, {httpStatus:403});
    }
  }
  static checkQueryConditions(conditions) {
    Object.entries(conditions).forEach(([tableName, data]) => {
      if (!tableName.match(/^[a-z][a-z_]+$/)) {
        throw new ApiError(`table name is not valid`, {httpStatus:400});
      }
      if (!Array.isArray(data) || !data.length) {
        throw new ApiError(`Invalid condition format`, { httpStatus: 400 });
      }
      data.forEach((condition) => {
        if (!Array.isArray(condition) || condition.length !== 3) {
          throw new ApiError(`Invalid condition format`, { httpStatus: 400 });
        }

        this.checkValidFieldName(condition[0]);
        this.checkValidOperator(condition[1]);
        if (!String(condition[2]).match(/^.+$/)) {
          console.log(condition[2])
          throw new ApiError(`value is not valid`, { httpStatus: 400 });
        }
      });
    });
  }
  static checkValidFieldName(fieldName) {
    if (!fieldName.match(/^[a-z][A-Za-z]+$/)) {
      throw new ApiError(`field name is not valid`, {httpStatus:400});
    }
  }
  static checkValidOperator(operator) {
    if (!operator.match(/^(=|!=|<|>|<=|>=)$/)) {
      throw new ApiError(`operator is not valid`, {httpStatus:400});
    }
  }
  static checkValidTimeFormat(value) {
    if (!value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      throw new ApiError(`time is not in valid format`, {httpStatus:400});
    }
  }
  static checkQueryForGet({filter, criteria, orderBy, page}={}) {
    if (filter) {
      this.checkQueryConditions(filter);      
    }
    if (criteria) {
      this.checkQueryConditions(criteria);      
    }
    if (orderBy) {
      if (!Array.isArray(orderBy) || orderBy.length > 0) {
        throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
      }
      orderBy.forEach(condition => {
        if (!Array.isArray(condition) || condition.length !== 2) {
          throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
        }
        this.checkValidFieldName(condition[0]);
        if (!condition[0].match(/^(ASC|DESC)$/)) {
          throw new ApiError(`Invalid order by condition`, { httpStatus: 400 });
        }
      });
    }
    if (page) {
      this.checkId(page, "page");
    }
    return {filter, criteria, orderBy, page};
  }
}
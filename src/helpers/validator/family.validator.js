import ApiError from '../errors/ApiError.js';

export default class FamilyValidator {
  static checkId(id) {
    if (!id.match(/^[1-9]\d*$/)) {
      throw new ApiError("ID should be a valid integer", { httpStatus: 400 });
    }
  }

  static checkIfExist(data, dataName) {
    if (!data) {
      throw new ApiError(`${dataName} not found.`, { httpStatus: 404 });
    }
  }

  static checkBodyForCreate(body) {
    const { name, description } = body;

    if (!name || !description) {
      throw new ApiError("Name and description are required for creating a family", { httpStatus: 400 });
    }

    // Specific validation for the name, it must be composed only of letter and space
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      throw new ApiError("Invalid characters in the family name. Only letters and spaces are allowed.", { httpStatus: 400 });
    }

    return { name, description };
  }

    static checkBodyForUpdate(body) {

    const { name, description } = body;

    if (!name && !description) {
      throw new ApiError("At least one of name or description is required for updating a family", { httpStatus: 400 });
    }

    if (name && name.length < 3) {
        throw new ApiError("Family name should be at least three characters long during update", { httpStatus: 400 });

        return { name, description };
  }
}
}
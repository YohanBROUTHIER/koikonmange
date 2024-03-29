export default class CoreValidator {
  static checkId(id, idName) {
    if (!id || !String(id).match(/^[1-9]\d*$/)) {
      throw new Error(`${idName || "Id"} should be a valid integer`);
    }
  }
  static checkIfExist(data, dataName) {
    if (!data) {
      throw new Error(`${dataName} not found.`);
    }
  }
  static checkValidity(data, dataName) {
    const dataDate = new Date(data).getTime();
    const date = new Date().getTime();

    if (dataDate > date) {
      throw new Error(`${dataName} is not valid`);
    }
  }
  static checkValidTimeFormat(value) {
    if (!value.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      throw new Error(`time is not in valid format`);
    }
  }
}
import CoreDatamapper from './core.datamapper.js';

export default class FamilyDatamapper extends CoreDatamapper {
  static tableName = 'family';

  /**
   * @param {object} filter
   * @param {object} filter.where property name = value 
   * @returns {array} Array of families found
   */
  static async findAll(filter = {}) {
    return super.findAll(filter);
  }

  /**
   * @param {integer} id search family by id
   * @returns {object} family
   */
  static async findByPk(id) {
    return super.findByPk(id);
  }

  /**
   * @param {object} data contain property for create family
   * @returns {object} created family
   */
  static async create(data) {
    return super.create(data);
  }

  /**
   * @param {object} data contain property for update family
   * @returns {object} updated family
   */
  static async update(data) {
    return super.update(data);
  }

  /**
   * @param {integer} id delete family by id
   * @returns {boolean} true if deleted successfully, false otherwise
   */
  static async delete(id) {
    return super.delete(id);
  }
}

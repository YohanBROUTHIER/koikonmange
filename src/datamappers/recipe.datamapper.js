import CoreDatamapper from './core.datamapper.js';

export default class RecipeDatamapper extends CoreDatamapper {
  static tableName = 'recipe';

  /**
   * @param {object} filter
   * @param {object} filter.where property name = value 
   * @returns {array} Array of recipes found
   */
  static async findAll(filter = {}) {
    return super.findAll(filter);
  }

  /**
   * @param {integer} id search recipe by id
   * @returns {object} recipe
   */
  static async findByPk(id) {
    return super.findByPk(id);
  }

  /**
   * @param {object} data contain property for create recipe
   * @returns {object} created recipe
   */
  static async create(data) {
    return super.create(data);
  }

  /**
   * @param {object} data contain property for update recipe
   * @returns {object} updated recipe
   */
  static async update(data) {
    return super.update(data);
  }

  /**
   * @param {integer} id delete recipe by id
   * @returns {boolean} true if deleted successfully, false otherwise
   */
  static async delete(id) {
    return super.delete(id);
  }
}

import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class UserDatamapper extends CoreDatamapper {
  static tableName = "user";
  static keyTableName = "user_key";

  /**
   * @param {object} data contain property for create element
   * @returns {object} element
   */
  static async createKey(data) {
    const result = await client.query(
      `SELECT * FROM create_${this.keyTableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {integer} uuid search element by id
   * @returns {object} element
   */
  static async findKeyByPkAndType(uuid, type) {
    const result = await client.query(`SELECT * FROM find_${this.keyTableName}($1) WHERE "type"=$2`, [{id:uuid}, type]);
    return result.rows[0];
  }

  /**
   * @param {integer} uuid delete element by id
   * @returns {object} element
   */
  static async deleteKey(uuid) {
    const result = await client.query(`SELECT * FROM delete_${this.keyTableName}($1)`, [{id:uuid}]);
    // 0 devient false et 1 devient true
    return !!result.rowCount;
  }
}
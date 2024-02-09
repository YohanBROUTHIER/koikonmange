import CoreDatamapper from './core.datamapper.js';

export default class IngredientDatamapper extends CoreDatamapper {
  static tableName = 'ingredient';

 /* DATAMAPPER A CHECK */


  /**
   * @param {object} filter
   * @param {object} filter.where property name = value 
   * @returns {array} Array of element found
   */
  static async findAll({where}) {  //{where:[{name:"email",operator:"=",value:data.email}]}
    const query = {
      text: `SELECT * FROM find_${this.tableName}()`,
      values: []
    };
    if (where) {
      query.text += " WHERE ";
      query.text += where.map(element => {
        query.values.push(element.value);
        return `"${element.name}"${element.operator}$${query.values.length}`;
      });
    }

    const result = await client.query(query);
    return result.rows;
  }

  /**
   * @param {integer} id search element by id
   * @returns {object} element
   */
  static async findByPk(id) {
    const result = await client.query(`SELECT * FROM find_${this.tableName}($1)`, [id]);
    return result.rows[0];
  }

  /**
   * @param {object} data contain property for create element
   * @returns {object} element
   */
  static async create(data) {
    const result = await client.query(
      `SELECT * FROM create_${this.tableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {object} data contain property for update element
   * @returns {object} element
   */
  static async update(data) {
    const result = await client.query(
      `SELECT * FROM update_${this.tableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {integer} id delete element by id
   * @returns {object} element
   */
  static async delete(id) {
    const result = await client.query(`SELECT * FROM delete_${this.tableName}($1)`, [id]);
    // 0 devient false et 1 devient true
    return !!result.rowCount;
  }
}
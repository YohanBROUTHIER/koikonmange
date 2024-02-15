import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class FamilyDatamapper extends CoreDatamapper {
  static tableName = 'family';

  static async addToRecipe(data) {
    const result = await client.query(
      `SELECT * FROM add_family_to_ingredient($1)`,
      [data],
    );
    return result.rows[0];
  }
  static async findFamilyToIngredient({where}={}) {
    let query = {
      text: `SELECT * FROM find_family_to_ingredient()`,
      values: []
    };
    query = this.addWhereToQuery(where, query);
    
    const result = await client.query(query);
    return result.rows[0];
  }
  static async removeToRecipe(data) {
    const result = await client.query(
      `SELECT * FROM remove_family_to_ingredient($1)`,
      [data],
    );
    return result.rows[0];
  }
}
import CoreDatamapper from './core.datamapper.js';

export default class IngredientDatamapper extends CoreDatamapper {
  static tableName = 'ingredient';

  static async addFamily(data) {
    const result = await client.query(
      `SELECT * FROM add_family_to_ingredient($1)`,
      [data],
    );
    return result.rows[0];
   }
   static async removeFamily(data) {
    const result = await client.query(
      `SELECT * FROM remove_family_to_ingredient($1)`,
      [data],
    );
    return result.rows[0];
   }
}
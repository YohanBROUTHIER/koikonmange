import CoreDatamapper from './core.datamapper.js';

export default class HistoryDatamapper extends CoreDatamapper {
  static tableName = 'history';

  static async addRecipeToHistory(data) {
    const result = await client.query(
      `SELECT * FROM add_recipe_to_history($1)`,
      [data],
    );
    return result.rows[0];
  }
}
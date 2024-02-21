import client from '../helpers/pg.client.js';
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
  static async findRecipeToHistory({filter, criteria}={}) {
    let query = {
      text: `SELECT * FROM find_recipe_to_history()`,
      values: []
    };
    query = this.addWhereToQuery({filter, criteria, query});
    const result = await client.query(query);
    return result.rows[0];
  }
  static async updateRecipeToHistory(data) {
    const result = await client.query(
      `SELECT * FROM update_recipe_to_history($1)`,
      [data],
    );
    return result.rows[0];
  }
  static async removeRecipeToHistory(data) {
    const result = await client.query(
      `SELECT * FROM remove_recipe_to_history($1)`,
      [data],
    );
    return result.rows[0];
  }
}
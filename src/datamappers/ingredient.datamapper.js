import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class IngredientDatamapper extends CoreDatamapper {
  static tableName = 'ingredient';
  static async addToRecipe(data) {
    const result = await client.query(
      `SELECT * FROM add_ingredient_to_recipe($1)`,
      [data],
    );
    return result.rows[0];
  }
  static async findIngredientToRecipe({filter, criteria}={}) {
    let query = {
      text: `SELECT * FROM find_ingredient_to_recipe()`,
      values: []
    };
    query = this.addWhereToQuery({filter, criteria, query});
    
    const result = await client.query(query);
    return result.rows[0];
  }
  static async updateToRecipe(data) {
    const result = await client.query(
      `SELECT * FROM update_ingredient_to_recipe($1)`,
      [data],
    );
    return result.rows[0];
  }
  static async removeToRecipe(data) {
    const result = await client.query(
      `SELECT * FROM remove_ingredient_to_recipe($1)`,
      [data],
    );
    return result.rows[0];
  }
}
import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class RecipeDatamapper extends CoreDatamapper {
  static tableName = 'recipe';

  static async findAll({filter, criteria, orderBy, page, number}={}) {
    let query = {
      text: `SELECT * FROM find_${this.tableName}()`,
      values: []
    };
    if (filter || criteria) {
      query = this.addWhereToQuery({filter, criteria, query});
    }
    if (orderBy) {
      query = this.addOrderByToQuery({orderBy, query});
    }
    if (page) {
      query = this.addOrderByToQuery({page, query, number});
    }
    const result = await client.query(query);
    return result.rows;
  }
}

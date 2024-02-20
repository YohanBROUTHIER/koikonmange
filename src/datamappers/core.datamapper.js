import client from '../helpers/pg.client.js';

export default class CoreDatamapper {
  static tableName;

  /**
   * @param {object} filter
   * @param {object} filter.where property name = value 
   * @returns {array} Array of element found
   */
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

  static addWhereToQuery({filter, criteria, query}) {
    query.text += " WHERE";
    if (filter) {
      query.text += " " + Object.entries(filter).map(([tableName, data]) => {
        return `(${data.map(condition => {
          query.values.push(condition[2]);
          return `"${condition[0]}"${condition[1]}$${query.values.length}`;
        }).join(" AND ")})`;
      }).join(" AND ");
    }
    if (criteria) {
      query.text += (filter ? " AND " : " ") + Object.entries(criteria).map(([tableName, data]) => {
        const newData = data.reduce((newObject, condition) => {
          if (newObject[condition[0]]) {
            newObject[condition[0]].push([condition[1], condition[2]]);
          } else {
            newObject[condition[0]] = [[condition[1], condition[2]]];
          }
          return { ...newObject };
        }, {});

        return Object.entries(newData).map(([propertyName, data]) => {
          return `(${data.map(condition => {
            query.values.push(condition[1]);
            return `"${propertyName}"${condition[0]}$${query.values.length}`;
          }).join(" OR ")})`;
        }).join(" AND ");
      }).join(" AND ");
    }
    
    return query;
  }
  static addOrderByToQuery({orderBy, query}) {
    query.text += ` ORDER BY ${orderBy.map(order => `${order[0]} ${order[1] || "ASC"}`).join(", ")}`;
    return query;
  }
  static addPaginationToQuery({page, query, number=50}) {
    const offset = (page - 1) * (number || 10); // Assuming 10 items per page by default
    query.text += ` LIMIT ${number || 10} OFFSET ${offset}`;
    return query;
  }
}
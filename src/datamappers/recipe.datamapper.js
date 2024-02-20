import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class RecipeDatamapper extends CoreDatamapper {
  static tableName = 'recipe';

  static addWhereToQuery({filter, criteria, query}) {
    query.text += " WHERE";
    if (filter) {
      query.text += " " + Object.entries(filter).map(([tableName, data]) => {
        return `(${data.map(condition => {
          query.values.push(condition[2]);

          if (tableName === "ingredient") {
            const type = typeof condition[2] === "number" ? "int" : "text";
            return `$${query.values.length} IN (SELECT (json_array_elements(ingredients)->>${condition[0]})::${type})`;
          }

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

            if (tableName === "ingredient") {
              const type = typeof condition[1] === "number" ? "int" : "text";
              return `$${query.values.length} IN (SELECT (json_array_elements(ingredients)->>${propertyName})::${type})`;
            }

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

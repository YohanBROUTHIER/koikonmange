import urlQueryJsonParser from "url-query-json-parser";

export function mappingUrlFunction(urlClient,filter){
  if (!urlClient) {
    return null;
  }

  let result = {};
  for (const [paramName, paramValue] of urlClient.searchParams) {
    if (!paramValue || paramName === ("orderBy" || "page")) {
      continue;
    }

    let [typeFilter, property, operator, tableName]=["filter", paramName, "=", "recipe"];

    if (property === "families") {
      tableName = "family";
      property = "id";
    }
    if (property === "ingredients") {
      tableName = "ingredient";
      property = "id";
    }
    if (property === "hunger") {
      typeFilter="criteria";
    }

    if (!result[typeFilter]) {
      result[typeFilter] = [];
    }
    if (!result[typeFilter][tableName]) {
      result[typeFilter][tableName] = [];
    }

    if (paramName.includes("preparatingTime") || paramName.includes("cookingTime")) {
      [property, operator] = paramName.split("-");
      if (operator === "min") {
        operator = ">=";
      } else {
        operator = "<=";
      }
    }
    
    if (!paramValue.split("-").some(val => !parseInt(val))) {
      paramValue.split("-").forEach(val => {
        result[typeFilter][tableName].push([property, operator, val]);
      });
      continue;
    }

    result[typeFilter][tableName].push([property, operator, paramValue]);
  }

  if (filter) {
    Object.entries(filter).forEach(([tableName,data]) => {
      if (!result["filter"]) {
        result["filter"]=[];
      }
      if (!result["filter"][tableName]) {
        result["filter"][tableName]=[];
      }

      data.forEach(condition => {
        result["filter"][tableName].push(condition);
      });
    });
  }

  return urlQueryJsonParser.parseJSON(result);
}
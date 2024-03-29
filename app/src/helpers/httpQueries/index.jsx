import urlQueryJsonParser from "url-query-json-parser";
import secondesConverterFunction from "../secondesConverterFunction";
import formatterSecondesTime from "../formatterSecondesTime";

export function mappingUrlFunction(urlClient,filter){
    // si il n'y a pas d'urlClient, on sort de la fonction
    if (!urlClient) {
        return null
    }
    const recipeQuery = []; 
    const ingredientQuery = [];
    const familyQuery = [];
    const orderByQuery = [];
    const recipeCriteriaQuery = [];
    let error = [];
    const errorDataPreparatingTime = 'Erreur sur le temps de préparation. Format de données non valide.';
    const errorDataCookingTime = 'Erreur sur le temps de cuisson. Format de données non valide.';
    const timeSecondesMax = {};
    const timeSecondesMin = {};
    
    // récupération de la query du formulaire
    const urlSplited = urlClient.search;
    // décodage des caractères spéciaux de la query
    const urlParsed = decodeURIComponent(urlSplited);
    // supression du "?" en début de string
    const queryString = urlParsed.slice(1);
    // création d'un tableau avec les données du formulaire
    const params = queryString.split('&');
    

    const mappingParams = params.forEach((param) => {
        const parts = param.split('=');
        const result = [parts[0], '=', parts[1]];

        // si le param est hunger
        if (result[0] === 'hunger') {
            // et que sa valeur est 'Copieux', ou 'Normal', ou 'Léger'
            if (result[2] === 'Copieux' || result[2] === 'Normal' || result[2] === 'Léger') {
                // on push dans la variable recipeCriteriaQuery
                recipeCriteriaQuery.push(result)
            }
        }

        // si le param commence par 'preparatingTime'
        if (result[0].startsWith('preparatingTime')) {
            // on récupère les les données entre les ':' dans un tableau
            let value = result[2].split(':');

            // si on a bien un tableau de 3 valeurs
            if (value.length === 3) {
                value.forEach((data) => {
                    // on vérifie que chacunes d'elles peut-être converti en nombre
                    const parseValue = parseInt(data);

                    // sinon on push une erreur et on sort de la fonction
                    if (parseValue == undefined || parseValue == isNaN) {
                        return error.push(errorDataPreparatingTime)
                    }
                });
                
                const property = 'preparatingTime';
                value = value.join(':');

                // on récupère la string après 'preparatingTime', c.à.d soit 'min' soit 'max'
                let operator = result[0].slice(15);

                // si c'est 'min'
                if (operator === 'min') {
                    // la variable operator prend la valeur '>='
                    // le temps de preparation doit être supérieur ou égale au temps minimal indiqué
                    operator = '>=';
                    const minimalTimeInSecondesPreparatingTime = secondesConverterFunction(value);
                    timeSecondesMin.preparatingTime = minimalTimeInSecondesPreparatingTime ;
                }
                // si c'est 'max'
                if (operator === 'max') {
                    // la variable operator prend la valeur '<='
                    // le temps de preparation doit être inférieur ou égale au temps maximal indiqué 
                    operator = '<=';
                    const maximalTimeInSecondesPreparatingTime = secondesConverterFunction(value);
                    timeSecondesMax.preparatingTime = maximalTimeInSecondesPreparatingTime ;
               
                }
                // le temps de préparation est une propriété de la table recipe dans la base de donnée
                // on push dans la variable recipeQuery : le nom de la propriété, l'opérateur, la valeur
                recipeQuery.push([property, operator, value]);
            } else return error = errorDataPreparatingTime
        }

        if (result[0].startsWith('cookingTime')) { // %3A; 00%3A21%3A44 => 00:21:44

            let value = result[2].split(':');
                if (value.length === 3) {
                    value.forEach((data) => {
                    const parseValue = parseInt(data);
                if (parseValue == undefined || parseValue == isNaN) {
                   
                    return error.push(errorDataCookingTime)
                }
                });
            value = value.join(':');
            let operator = result[0].slice(11); 
            if (operator === 'min') {
                operator = '>=';
                const minimalTimeInSecondesCookingTime = secondesConverterFunction(value);
                timeSecondesMin.cookingTime = minimalTimeInSecondesCookingTime;
            }
            if (operator === 'max') {
                operator = '<=';
                    const maximalTimeInSecondesCookingTime = secondesConverterFunction(value);
                    timeSecondesMax.cookingTime = maximalTimeInSecondesCookingTime;
                } else return error = errorDataCookingTime
            }
        }
        // si le param est ingredients ou families
        if (result[0] === 'ingredients' || result[0] === 'families') {
            // on récupère les valeurs des param 
            // des id séparés par des '-' 
            const splitedIngredientValue = result[2].split("-");
            
            // on les converti en nombre pour vérification
            const convertedArray = splitedIngredientValue.map((data) => {
                const parseNumber = parseInt(data);
                return parseNumber
            })
            // si un valeur n'est pas convertible en nombre la valeur d'erreur devient true
            const foundErrorTypeData = convertedArray.find((data) => data == undefined || data == isNaN)

            // si il n'y a pas d'erreur
            if (!foundErrorTypeData) {

                splitedIngredientValue.forEach((data) => {
                    // si le param est ingrédient
                    if (result[0] === "ingredients" && data !== '') {
                        // variable avec le nom de la propriété, l'operateur, la valeur reconverti en string
                        const resultParam = ['id', '=', data.toString()]
                        // on push dans ingrédientQuery
                        ingredientQuery.push(resultParam);
                    }

                    if (result[0] === "families" && data !== '') {
                        const resultParam = ["id", '=', data.toString()]
                        familyQuery.push(resultParam);
                    }  
                })
            }
            
        }

        if (result[0].startsWith('orderBy')) {
            if (result[0].slice(7) === "name" || result[0].slice(7) === "time" || result[0].slice(7) === "hunger") {
                const resultParam = [result[0].slice(7), result[2]]
                orderByQuery.push(resultParam)
            }
        }
    })

    if (timeSecondesMin.preparatingTime && timeSecondesMin.cookingTime) {
        const timeProperty = 'time';
        const timeOperator = '>=';
        const totalTimesSecondes = timeSecondesMin.preparatingTime + timeSecondesMin.cookingTime;
        const timeValue = formatterSecondesTime(totalTimesSecondes);
        recipeQuery.push([timeProperty, timeOperator, timeValue]);
    }

    if (timeSecondesMax.preparatingTime && timeSecondesMax.cookingTime) {
        const timeProperty = 'time';
        const timeOperator = '<=';
        const totalTimesSecondes = timeSecondesMax.preparatingTime + timeSecondesMax.cookingTime;
        const timeValue = formatterSecondesTime(totalTimesSecondes);
        recipeQuery.push([timeProperty, timeOperator, timeValue]);
    }

    let stringFilter = '';
    let stringOrderBy = '';
    let stringCriteria = '';

    // typage demandé :
    // filter={<nom de la table>:[[<nom de la propriété>,<operateur>,<valeur>]]...}
    const builderStringFunction = (queryArray, string, tableName) => {

        // on vérifie que les variables array ne soient pas vide
        if (queryArray.length > 0) {
            // afin d'être insérer dans les variables strings, on stringify les array
            // string += `"${tableName}":${JSON.stringify(queryArray)},`;
            string += `${tableName?`"${tableName}"`:""}:${JSON.stringify(queryArray)},`;
        }
        return string
    }

    stringFilter = builderStringFunction(recipeQuery, stringFilter, "recipe");
    stringFilter = builderStringFunction(ingredientQuery, stringFilter, "ingredient");
    stringFilter = builderStringFunction(familyQuery, stringFilter, "family");

    stringOrderBy = builderStringFunction(orderByQuery, stringOrderBy);

    stringCriteria = builderStringFunction(recipeCriteriaQuery, stringCriteria, "recipe");

    const filterProperty = `"filter":{${stringFilter}},`;
    const orderByProperty = `"orderBy"${stringOrderBy}`;
    const criteriaProperty = `"criteria":{${stringCriteria}},`;

    let stringFinalObject = `{${stringCriteria.length > 0?criteriaProperty:""}${stringFilter.length > 0?filterProperty:""}${stringOrderBy.length > 0?orderByProperty:""}}`;

    // regex pour remplacer la chaîne de caractère “,}” par “}”
    stringFinalObject = stringFinalObject.replace(/,\}/g, '}');
    
    // parse de la string en objet au format JSON
    const objectQuery = JSON.parse(stringFinalObject);
    
    if (filter) {
      Object.entries(filter).forEach(([tableName,data]) => {
        if (!objectQuery["filter"]) {
          objectQuery["filter"]=[];
        }
        if (!objectQuery["filter"][tableName]) {
          objectQuery["filter"][tableName]=[];
        }
        data.forEach(condition => {
          objectQuery["filter"][tableName].push(condition)
        })
      });
    }

    // eslint-disable-next-line no-inner-declarations
    let urlQuery = urlQueryJsonParser.parseJSON(objectQuery);
    // if (error.length) urlQuery = error;
    return urlQuery;
 

}
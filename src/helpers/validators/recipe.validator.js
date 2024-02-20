import ApiError from '../../helpers/apiError.js';
import CoreValidator from './core.validator.js';

export default class RecipeValidator extends CoreValidator {
  static checkBodyForCreate({ name, image, steps, hunger, time, preparationTime, person, userId }) {
    if (!name || !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (!steps) {
      throw new ApiError("Merci d'indiquer les étapes de la préparation.", {name: "Bad Request", httpStatus:400});
    }
    steps.forEach((step, index) => {
      if (!String(step)) {
        throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
      }
    });
    if (hunger && !["little","normal","big"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: little, normal, big`, {name: "Bad Request", httpStatus:400});
    }
    if (!time || !String(time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (!preparationTime || !String(preparationTime).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    this.checkId(person);
    if (userId) {
      this.checkId(userId);      
    }

    return { name, image, steps, hunger, time, preparationTime, person, userId };
  }

  static checkBodyForUpdate({ name, image, steps, hunger, time, preparationTime, person, userId }) {
    if (name && !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (steps) {
      steps.forEach((step, index) => {
        if (!String(step)) {
          throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
        }
      });
    }
    if (hunger && !["little","normal","big"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: little, normal, big`, {name: "Bad Request", httpStatus:400});
    }
    if (time && !String(time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (preparationTime && !String(preparationTime).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (person) {
      this.checkId(person);      
    }
    if (userId) {
      this.checkId(userId);
    }

    return { name, image, steps, hunger, time, preparationTime, person, userId };
  }

  static checkQueryForGet({filter, criteria, orderBy, page}={}) {
    if (filter) {
      this.checkQueryConditions(filter);      
    }
    if (criteria) {
      this.checkQueryConditions(criteria);      
    }
    if (orderBy) {
      if (!Array.isArray(orderBy) || orderBy.length > 0) {
        throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
      }
      orderBy.forEach(condition => {
        if (!Array.isArray(condition) || condition.length !== 2) {
          throw new ApiError(`Invalid order by format`, { httpStatus: 400 });
        }
        this.checkValidFieldName(condition[0]);
        if (!condition[0].match(/^(ASC|DESC)$/)) {
          throw new ApiError(`Invalid order by condition`, { httpStatus: 400 });
        }
      });
    }
    if (page) {
      this.checkId(page, "page");
    }
    return {filter, criteria, orderBy, page};
  }
}
